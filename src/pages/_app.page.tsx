import { UserContextProvider } from '@/contexts/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </>
    )
}
