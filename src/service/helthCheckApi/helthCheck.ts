import { GetServerSidePropsContext } from 'next';
import { GetCorrectApi } from '../../utils/GetCorrectApi';
import {
  GetClusterStatusInfo,
  GetCpuUsageData,
  GetMemoryUsageData,
} from './helthCheckRoutes';

interface IGetCpuUsageData {
  ctx?: GetServerSidePropsContext;
}

export const getCpuUsageData = async ({ ctx }: IGetCpuUsageData) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetCpuUsageData);
    return response.data;
  } catch (error) {
    return error;
  }
};

interface IGetMemoryUsageData {
  ctx?: GetServerSidePropsContext;
}

export const getMemoryUsageData = async ({ ctx }: IGetMemoryUsageData) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetMemoryUsageData);
    return response.data;
  } catch (error) {
    return error;
  }
};

interface IGetClusterStatusInfo {
  ctx?: GetServerSidePropsContext;
}

export const getClusterStatusInfo = async ({ ctx }: IGetClusterStatusInfo) => {
  const api = GetCorrectApi(ctx);

  try {
    const response = await api.get(GetClusterStatusInfo);
    return response.data;
  } catch (error) {
    return error;
  }
};
