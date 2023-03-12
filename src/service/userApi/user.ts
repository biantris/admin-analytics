import { GetServerSidePropsContext } from 'next';
import { GetCorrectApi } from '../../utils/GetCorrectApi';
import { api as ApiClient } from '../apiClient';
import {
  AuthUser,
  CreateUser,
  GetAllUser,
  GetUserByEmail,
  GetUserById,
} from './userRoutes';

interface ICreateAuthenticateUser {
  email: string;
  password: string;
}

export const createAuthenticationUser = async ({
  email,
  password,
}: ICreateAuthenticateUser) => {
  const data = { email, password };
  try {
    const response = await ApiClient.post(AuthUser, data);

    return response.data;
  } catch (error) {
    return error;
  }
};

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  access_level: string;
}

export const createUser = async ({
  name,
  email,
  password,
  access_level,
}: ICreateUser) => {
  const data = { name, email, password, access_level };
  try {
    const response = await ApiClient.post(CreateUser, data);

    return response.data;
  } catch (error) {
    return error;
  }
};

interface IGetUser {
  ctx?: GetServerSidePropsContext | undefined;
  id: string;
}

export const getUser = async ({ ctx, id }: IGetUser) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetUserById(id));
    return response.data;
  } catch (error) {
    return error;
  }
};

interface IGetAllUser {
  ctx?: GetServerSidePropsContext | undefined;
}

export const getAllUser = async ({ ctx }: IGetAllUser) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetAllUser);
    return response.data;
  } catch (error) {
    return error;
  }
};

interface IGetUserByEmail {
  ctx?: GetServerSidePropsContext | undefined;
  id: string;
}

export const getUserByEmail = async ({ ctx, id }: IGetUserByEmail) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetUserByEmail(id));
    return response.data;
  } catch (error) {
    return error;
  }
};
