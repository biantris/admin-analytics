import { GetServerSidePropsContext } from 'next';
import { destroyCookie } from 'nookies';

type DestroyAllCookies = {
  ctx?: GetServerSidePropsContext | undefined;
};

export const destroyAllCookies = ({ ctx = undefined }: DestroyAllCookies) => {
  destroyCookie(ctx, 'adminAnalytics.token', {
    path: '/',
  });
};
