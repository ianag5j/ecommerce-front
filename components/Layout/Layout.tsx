import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Menu from '../UI/Menu'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  if (router.pathname.includes('redirect')) {
    return children
  }
  return (
    <>
      <main className='main-container'>
        <Menu />
        <div className='mt-[80px] flex gap-3 sm:flex-row flex-col w-full'>
          {children}
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
    </>
  )
}

export default Layout