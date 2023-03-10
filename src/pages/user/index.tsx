import { GetServerSideProps } from 'next';
import { Nav } from '../../components/Nav';
import { WrapperDash } from '../../components/WrapperDash';
import { withSSRAuth } from '../../utils/auth/withSSRAuth';

import Head from 'next/head';
import { parseCookies } from 'nookies';
import { getUser } from '../../service/userApi/user';
import { getInfosDecodedToken } from '../../utils/getInfosDecodedToken';

const User = () => {
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
        <WrapperDash>
          <div className="flex flex-col justify-center p-1 h-96 w-80">
            <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
              Usuários
            </h2>
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

export default User;
