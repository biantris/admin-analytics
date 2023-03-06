import Head from 'next/head';

import { ChartPie, data } from '../components/ChartPie';
import { Nav } from '../components/Nav';

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
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg justify-center h-full w-full">
              <div className="flex flex-col md:flex-row justify-center h-full w-full">
                <div className="flex flex-col justify-center p-1 h-full">
                  <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
                    Consumo de CPU
                  </h2>
                  <ChartPie data={data} />
                </div>

                <div className="flex flex-col justify-center p-1 h-full">
                  <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
                    Consumo de Memória
                  </h2>
                  <ChartPie data={data} />
                </div>

                <div className="flex flex-col justify-center p-1 h-full">
                  <h2 className="mt-6 text-center text-1xl font-normal text-gray-900">
                    Status do Cluster
                  </h2>
                  <ChartPie data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
