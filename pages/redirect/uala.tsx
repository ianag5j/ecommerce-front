import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import LoadingSpinner from '../../components/UI/LoadingSpinner'

const RedirectUala = () => {
  const router = useRouter()
  console.log(router.query);
  useEffect(() => {
    const saveCredentials = async () => {
      try {
        await axios.post('/api/uala', { code: router.query.code, state: router.query.state },
          {
            headers: {
              Authorization: Cookies.get('sess') as string
            }
          }
        )
        window.top?.location.replace('/')
      } catch (error) {
        alert('Error al guardar las credenciales')
        window.top?.location.replace('/admin')
      }
    }
    if (typeof window !== 'undefined' && router.query.code) {
      saveCredentials();
    }
  }, [router.query])
  return (
    <div className='flex m-auto mt-10'>
      <LoadingSpinner />
    </div>
  )
}

export default RedirectUala