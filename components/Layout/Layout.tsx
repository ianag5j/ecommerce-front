import React, { useContext } from 'react'
import Menu from '../UI/Menu'
import { useRouter } from 'next/router'
import { ErrorContext } from '../../contexts/ErrorContext'
import { PlusIcon } from '@heroicons/react/20/solid'

interface LayoutProps {
  children: React.ReactElement
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { errorMessage, setErrorMessage } = useContext(ErrorContext)
  if (router.pathname.includes('redirect')) {
    return children
  }
  return (
    <>
      <main className='main-container'>
        <Menu />
        <div className='mt-[80px] w-full gap-3 flex flex-col'>
          {errorMessage && (
            <p className='bg-error dark:bg-error-dark w-full p-3 rounded relative'>
              {errorMessage}
              <PlusIcon
                width="24"
                className='absolute right-3 top-3 rotate-45 cursor-pointer'
                aria-hidden="true"
                onClick={() => { setErrorMessage(null) }}
              />
            </p>
          )}
          <div className='flex gap-3 sm:flex-row flex-col w-full justify-evenly'>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default Layout