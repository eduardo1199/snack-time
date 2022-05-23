import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <Component {...pageProps} />
  )
}


export default MyApp
