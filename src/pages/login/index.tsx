import Head from 'next/head';
import * as yup from 'yup';

import { LockClosedIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

type LoginData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  })
  .required();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: LoginData) => {
    setLoading(true);

    try {
      await signIn(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error('E-mail ou senha incorreta!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
      </Head>

      <div className="max-w-sm w-full space-y-8">
        <div>
          <img
            className="mx-auto h-15 w-auto"
            src="/img/profile-share.png"
            alt="Profile share logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login em sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Digite seu Email
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors?.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite seu Email"
              />

              {errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Digite sua Senha
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors?.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite sua Senha"
              />

              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {loading ? <h3>Carregando...</h3> : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
