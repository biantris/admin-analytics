/* eslint-disable */
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { BASE_URL_BACKEND } from '../environments/values';

export const setupAPIClient = (
  context: GetServerSidePropsContext | undefined = undefined
) => {
  const { 'adminAnalytics.token': token } = parseCookies(context);

  const api: any = axios.create({
    baseURL: BASE_URL_BACKEND,
    headers: {
      Authorization: `${token}`,
    },
  });

  api.interceptors.response.use(
    (response: any) => response,
    (err: AxiosError) => {}
  );

  if (token) {
    api.defaults.headers['Authorization'] = `${token}`;
  }

  return api;
};
