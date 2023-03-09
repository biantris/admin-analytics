import { GetServerSideProps } from 'next';
import Head from 'next/head';

export const Home = () => (
  <>
    <Head>
      <title>Admin Analytics Front-end</title>
    </Head>
  </>
);

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/login',
    permanent: false,
  },
});

export default Home;
