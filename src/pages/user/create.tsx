import Head from 'next/head';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Nav } from '../../components/Nav';
import { WrapperDash } from '../../components/WrapperDash';
import { createUser, getUser } from '../../service/userApi/user';
import { withSSRAuth } from '../../utils/auth/withSSRAuth';
import { getInfosDecodedToken } from '../../utils/getInfosDecodedToken';

type CreateData = {
  name: string;
  email: string;
  password: string;
  access_level: string;
};

const schema = yup
  .object({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
    access_level: yup.string().required('Campo obrigatório'),
  })
  .required();

const Create = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateData>({
    resolver: yupResolver(schema),
  });

  const handleCreateUSer = async (data: CreateData) => {
    setLoading(true);

    try {
      await createUser(data);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      toast.success('Seu usuário foi criado com sucesso!');
      Router.push('/user');
    } catch (error) {
      toast.error('Algum dos campos está inválido!');
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard - Novo Usuário</title>
      </Head>

      <Nav />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Cadastrar Novo Usuário
          </h1>
        </div>
      </header>

      <main>
        <WrapperDash>
          <div className="flex flex-col justify-center items-center p-1 h-full w-full">
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit(handleCreateUSer)}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="select-element"
                  >
                    Digite um nome para o Usuário:
                  </label>
                  <label htmlFor="name" className="sr-only">
                    Digite seu Nome
                  </label>
                  <input
                    {...register('name')}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                      errors?.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite seu Nome"
                  />

                  {errors?.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-bold mb-2 mt-3"
                    htmlFor="select-element"
                  >
                    Digite um email para o Usuário:
                  </label>
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
                  <label
                    className="block text-gray-700 font-bold mb-2 mt-3"
                    htmlFor="select-element"
                  >
                    Digite uma senha para o Usuário
                  </label>

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

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="select-element"
                >
                  Selecione um Nível de Acesso:
                </label>
                <select
                  {...register('access_level')}
                  className="form-select block w-full mt-1 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  id="select-element"
                >
                  <option value="">Selecione um Nível de Acesso</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="pb-3">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? <h3>Carregando...</h3> : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </WrapperDash>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const { 'adminAnalytics.token': token } = parseCookies(ctx);
    const userId = await getInfosDecodedToken(token);

    const { access_level } = await getUser({ ctx, id: userId });

    if (!access_level || access_level !== 'ADMIN') {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default Create;
