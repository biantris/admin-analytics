import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
