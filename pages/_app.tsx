import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductContextContainer from '../contexts/ProductContext'
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <ProductContextContainer>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductContextContainer>
  </UserProvider>
)

export default MyApp
