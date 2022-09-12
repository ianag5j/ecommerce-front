import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductContextContainer from '../contexts/ProductContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <ProductContextContainer>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ProductContextContainer>
}

export default MyApp
