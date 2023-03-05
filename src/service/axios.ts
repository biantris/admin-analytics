import axios from 'axios';
import { parseCookies } from 'nookies';

export const getAPIClient = (ctx?: any) => {
  const { 'nextauth-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333', //change to config.API_URL
  });

  api.interceptors.request.use((config) => {
    console.log(config);

    return config;
  });

  if (token) {
    //@ts-ignore
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
};
