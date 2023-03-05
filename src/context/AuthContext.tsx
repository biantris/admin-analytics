import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';

import { recoverUserInformation, signInRequest } from '../service/auth';

type UserType = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInDataType = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  signIn: (data: SignInDataType) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

//@ts-ignore
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth-token': token } = parseCookies();
    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  const signIn = async ({ email, password }: SignInDataType) => {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'nextauth-token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    Router.push('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
