import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import CartList from '../components/CartList/CartList'
import Modal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import ProductContextContainer, { ProductContext } from '../contexts/ProductContext'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { cart } = useContext(ProductContext)
  const [showCartList, setShowCartList] = useState(false)
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='flex gap-3 flex-row'>
          <ProductCard product={{ id: 1, name: 'TV', price: 9999.99 }} />
          <ProductCard product={{ id: 2, name: 'iphone', price: 99999.99 }} />
        </div>
        {showCartList && (
          <Modal title="Carrito" footer={
            <>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent dark:bg-primary-dark bg-primary px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => router.push('/buy')}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => setShowCartList(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:bg-secondary-dark bg-secondary px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </>
          }>
            <CartList />
          </Modal>
        )}
        <div className='w-full dark:bg-surface-dark bg-surface p-4 absolute bottom-0'>
          <button className='rounded p-2 dark:bg-primary-dark bg-primary ml-auto' onClick={() => setShowCartList(true)}>Finalizar compra</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
