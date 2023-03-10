import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { withSSRAuth } from '../../utils/auth/withSSRAuth';

import { ChartPie } from '../../components/ChartPie';
import { Nav } from '../../components/Nav';
import { WrapperDash } from '../../components/WrapperDash';
import { mapMemoryCPUData } from '../../domain/CpuUsageData';
import { mapMemoryUsageData } from '../../domain/MemoryUsageData';
import {
  getClusterStatusInfo,
  getCpuUsageData,
  getMemoryUsageData,
} from '../../service/helthCheckApi/helthCheck';

export type DataType = {
  labels: string[];
  data: number[];
};

interface IDashboardProps {
  status: string;
  dataPieMemory: DataType;
  dataPieCPU: DataType;
}

const Dashboard = ({ status, dataPieMemory, dataPieCPU }: IDashboardProps) => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
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
            <h2 className="mt-6 text-center text-1xl font-semibold text-gray-900">
              Consumo de CPU
            </h2>
            <ChartPie data={dataPieCPU} />
          </div>

          <div className="flex flex-col justify-center p-1 h-96 w-80">
            <h2 className="mt-6 text-center text-1xl font-semibold text-gray-900">
              Consumo de Memória
            </h2>
            <ChartPie data={dataPieMemory} />
          </div>

          <div className="flex flex-col justify-center p-1 h-96 w-80">
            <h2 className="mt-6 text-center text-1xl font-semibold text-gray-900">
              Status do Cluster
            </h2>
            <div className="flex flex-col justify-center items-center pt-36 pb-40">
              <span className="bg-green-100 text-green-800 text-xs font-medium w-40 text-center px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {status}
              </span>
            </div>
          </div>
        </WrapperDash>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const { status } = await getClusterStatusInfo({ ctx });

    const dataPieMemory = await getMemoryUsageData({ ctx });
    const dataPieCPU = await getCpuUsageData({ ctx });

    const listMemoryUsageData = mapMemoryUsageData(dataPieMemory);
    const listCPUData = mapMemoryCPUData(dataPieCPU);

    return {
      props: {
        status,
        dataPieMemory: listMemoryUsageData,
        dataPieCPU: listCPUData,
      },
    };
  }
);

export default Dashboard;
