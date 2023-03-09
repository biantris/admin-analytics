import Head from 'next/head';

import { ChartBar, dataBar } from '../../components/ChartBar';
import { ChartPie, dataPie } from '../../components/ChartPie';

import { Nav } from '../../components/Nav';
import { WrapperDash } from '../../components/WrapperDash';

const Dashboard = () => {
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
            <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
              Consumo de CPU
            </h2>
            <ChartBar data={dataBar} />
          </div>

          <div className="flex flex-col justify-center p-1 h-96 w-80">
            <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
              Consumo de Memória
            </h2>
            <ChartPie data={dataPie} />
          </div>

          <div className="flex flex-col justify-center p-1 h-96 w-80">
            <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
              Status do Cluster
            </h2>
            <div className="flex flex-col justify-center items-center pt-36 pb-40">
              <span className="bg-green-100 text-green-800 text-xs font-medium w-40 text-center px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Green
              </span>
            </div>
          </div>
        </WrapperDash>
      </main>
    </div>
  );
};

export default Dashboard;
