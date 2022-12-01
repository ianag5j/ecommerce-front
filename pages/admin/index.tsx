import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { getAccountData } from 'services/account'
import Box from 'components/Box'
import LoadingSpinner from 'components/UI/LoadingSpinner'
import WithAuth from 'components/WithAuth'
import { ErrorContext } from 'contexts/ErrorContext'

type AccountData = {
  hasUalaCredentials?: boolean,
  store?: {
    Name: string,
    UserId: string
  }
}

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { setErrorMessage } = useContext(ErrorContext)
  const router = useRouter()
  const [{ hasUalaCredentials, store }, setAccountData] = useState<AccountData>({ hasUalaCredentials: undefined, store: undefined })
  useEffect(() => {
    const run = async () => {
      try {
        setAccountData(await getAccountData('Uala'))
        setIsLoading(false)
      } catch (error: any) {
        setErrorMessage(error.response.data.message)
      }
    }
    if (typeof window !== 'undefined') {
      run()
    }
  }, [])
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className="text-xl text-primary dark:text-primary-dark">Administrar</h2>
      {isLoading && <LoadingSpinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 mb-20">
        {!isLoading && (
          <>
            <Box>
              <p className='text-center'>Tienda</p>
              {store ? (
                <>
                  <span className='text-green-400 text-center'>{store.Name}</span>
                  <Link href={`/store/${store.Name}`}>
                    <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full'>Ver Tienda</button>
                  </Link>
                </>
              ) : <span className='text-red-400 text-center'>Desactivado</span>}
              {!store && (
                <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full' onClick={() => router.push('/admin/stores/create')}>Configurar</button>
              )}
            </Box>
            <Box>
              <p className='text-center'>Integracion con Uala Bis</p>
              {hasUalaCredentials ? <span className='text-green-400 text-center'>Activado</span> : <span className='text-red-400 text-center'>Desactivado</span>}
              {!hasUalaCredentials && (
                <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full' onClick={() => router.push('/admin/uala-credentials')}>Activar</button>
              )}
            </Box>
            <Box className="justify-between">
              <p className='text-center'>Productos</p>
              <Link href="/admin/products">
                <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full'>Ver</button>
              </Link>
            </Box>
          </>
        )}
      </div>
    </div>
  )
}

export default WithAuth(IndexPage)