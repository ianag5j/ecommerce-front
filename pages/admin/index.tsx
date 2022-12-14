import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Box from '../../components/Box'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { getCredentials } from '../../services/credentials'

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [hasUalaCredentials, setHasUalaCredentials] = useState(false)
  useEffect(() => {
    const run = async () => {
      console.log('getCredentials');
      setHasUalaCredentials(await getCredentials('Uala'))
      setIsLoading(false)
    }
    if (typeof window !== 'undefined') {
      run()
    }
  })
  return (
    <div className='flex flex-col gap-3 w-full'>
      <h2 className="text-xl text-primary">Administrar</h2>
      <div className="flex w-full gap-2">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <Box>
              <p className='text-center'>Integracion con Uala Bis</p>
              {hasUalaCredentials ? <span className='text-green-400 text-center'>Activado</span> : <span className='text-red-400 text-center'>Desactivado</span>}
              {!hasUalaCredentials && (
                <button className='rounded p-2 dark:bg-primary-dark bg-primary w-full' onClick={() => router.push('/admin/uala-credentials')}>Activar</button>
              )}
            </Box>
          </>
        )}
      </div>
    </div>
  )
}

export default IndexPage