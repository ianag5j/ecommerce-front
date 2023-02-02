import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductContextContainer from '../contexts/ProductContext'
import ErrorContextContainer from '../contexts/ErrorContext'
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout'
import { Provider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_TOKEN,
  enviroment: process.env.NODE_ENV
}

console.log(rollbarConfig);

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <UserProvider>
        <ProductContextContainer>
          <ErrorContextContainer>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ErrorContextContainer>
        </ProductContextContainer>
      </UserProvider>
    </ErrorBoundary>
  </Provider>
)

export default MyApp
