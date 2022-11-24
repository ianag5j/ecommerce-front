import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Box from '../../../components/Box'
import Button from '../../../components/UI/Button'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import WithAuth from '../../../components/WithAuth'

const CreateProductPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    axios.post('/api/products', { name: formData.get('name'), price: formData.get('price') })
      .then(() => {
        router.push('/admin/products')
        setIsLoading(false)
      }).catch(() => {
        alert('Error al cargar el producto')
      })
    setIsLoading(false)
  }
  return (
    <Box>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <input className='p-2 rounded border-solid border-b-2 dark:border-primary-dark border-primary' type="text" name='name' placeholder='Nombre' required />
        <input className='p-2 rounded border-solid border-b-2 dark:border-primary-dark border-primary' type="text" name='price' placeholder='Precio' required />
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? <span>Crear</span> : <LoadingSpinner />}
        </Button>
      </form>
    </Box>
  )
}

export default WithAuth(CreateProductPage)