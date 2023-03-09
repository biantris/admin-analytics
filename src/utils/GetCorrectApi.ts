import { GetServerSidePropsContext } from 'next';
import { setupAPIClient as ApiSSR } from '../service/api';
import { api as ApiClient } from '../service/apiClient';

export const GetCorrectApi = (
  ctx?: GetServerSidePropsContext | null | undefined
) => {
  if (!ctx) return ApiClient;

  return ApiSSR(ctx);
};
