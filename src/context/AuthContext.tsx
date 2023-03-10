/* eslint-disable no-useless-catch */
import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../service/apiClient';
import { createAuthenticationUser, getUser } from '../service/userApi/user';
import { destroyAllCookies } from '../utils/destroyAllCookies';
import { getInfosDecodedToken } from '../utils/getInfosDecodedToken';

export type User = {
  id: string;
  name: string;
  email: string;
  access_level: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  // eslint-disable-next-line no-unused-vars
  signIn: (data: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export const signOut = (broadcast = true) => {
  destroyAllCookies({});

  if (broadcast) {
    authChannel.postMessage('signOut');
  }

  Router.push('/login');
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut(false);
          break;
        case 'signIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'adminAnalytics.token': token } = parseCookies();

    (async () => {
      if (token) {
        const userId = await getInfosDecodedToken(token);

        await getUser({ id: userId })
          .then((userResponse) => {
            const { id, email, name, access_level } = userResponse;

            setUser({
              id,
              email,
              name,
              access_level,
            });
          })
          .catch((err) => {
            console.log(err);
            signOut();
          });
      }
    })();
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const user = await createAuthenticationUser({
        email,
        password,
      });

      const { id, token, name, access_level } = user;

      if (!token || !user) {
        throw 'E-mail ou senha incorreta!';
      }

      setCookie(undefined, 'adminAnalytics.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: '/',
      });

      api.defaults.headers['Authorization'] = `${token}`;

      setUser({
        id,
        email,
        name,
        access_level,
      });

      Router.push('/dashboard');
      authChannel.postMessage('signIn');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
