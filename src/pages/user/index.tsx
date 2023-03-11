/* eslint-disable no-undef */
import { GetServerSideProps } from 'next';
import { Nav } from '../../components/Nav';
import { WrapperDash } from '../../components/WrapperDash';
import { withSSRAuth } from '../../utils/auth/withSSRAuth';

import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Key } from 'react';
import { getAllUser, getUser } from '../../service/userApi/user';
import { getInfosDecodedToken } from '../../utils/getInfosDecodedToken';

interface IUserProps {
  userAll: {
    map(
      // eslint-disable-next-line no-unused-vars
      arg0: (userAll: { id: Key | null | undefined }) => JSX.Element
    ): import('react').ReactNode;
    name: string;
    email: string;
    access_level: string;
  };
}

const User = ({ userAll }: IUserProps) => {
  return (
    <div>
      <Head>
        <title>Dashboard - Usuários</title>
      </Head>

      <Nav />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main>
        <div className="flex justify-end max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-3">
          <button className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
            Novo Usuário
          </button>
        </div>
        <WrapperDash>
          <div className="flex flex-col justify-center items-center p-1 h-full w-full">
            <h2 className="text-center text-1xl font-semibold p-3 text-gray-900">
              Usuários
            </h2>

            <div className="overflow-x-auto p-3 pb-8">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Nome</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Nível de Acesso</th>
                  </tr>
                </thead>
                <tbody>
                  {userAll.map((userAll) => (
                    <tr key={userAll.id}>
                      <td className="border px-4 py-2">{userAll.name}</td>
                      <td className="border px-4 py-2">{userAll.email}</td>
                      <td className="border px-4 py-2">
                        {userAll.access_level}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

    const userAll = await getAllUser({ ctx });

    console.log('USERS', userAll);

    return {
      props: { userAll },
    };
  }
);

export default User;
