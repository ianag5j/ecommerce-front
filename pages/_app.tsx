import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductContextContainer from '../contexts/ProductContext'
import ErrorContextContainer from '../contexts/ErrorContext'
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <ProductContextContainer>
      <ErrorContextContainer>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorContextContainer>
    </ProductContextContainer>
  </UserProvider>
)

export default MyApp
