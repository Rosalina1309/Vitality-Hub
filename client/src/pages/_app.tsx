'use client'

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '@/components/Layout';
import { useEffect } from 'react';
import store from '@/store/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('_app runnning')

  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
