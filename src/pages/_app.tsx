import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <ToastContainer />
      </div>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
