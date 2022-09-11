import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProductContextContainer from '../contexts/ProductContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <ProductContextContainer>
    <Component {...pageProps} />
  </ProductContextContainer>
}

export default MyApp
