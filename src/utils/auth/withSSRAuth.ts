/* eslint-disable */
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';
import { AuthTokenError } from '../../service/errors/AuthTokenError';
import { destroyAllCookies } from '../destroyAllCookies';

type WithSSRAuthOptions = {
  roles?: string[];
};

export const withSSRAuth = <P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
): GetServerSideProps => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P> | any> => {
    const { ['adminAnalytics.token']: token } = parseCookies(context);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyAllCookies({ ctx: context });

        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    }
  };
};
