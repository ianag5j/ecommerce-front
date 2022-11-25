import axios from 'axios'
import Box from 'components/Box'
import Button from 'components/UI/Button'
import LoadingSpinner from 'components/UI/LoadingSpinner'
import WithAuth from 'components/WithAuth'
import { ErrorContext } from 'contexts/ErrorContext'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setErrorMessage } = useContext(ErrorContext)
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target as HTMLFormElement);
    axios.post('/api/stores', { name: formData.get('name') })
      .then(() => {
        router.push('/admin')
        setErrorMessage(null)
      }).catch((error) => {
        setErrorMessage(error.response.data.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <Box>
      <h1 className='text-xl text-primary dark:text-primary-dark mb-1'>Crear Tienda</h1>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <input className='p-2 rounded border-solid border-b-2 dark:border-primary-dark border-primary' type="text" name='name' placeholder='Nombre' required />
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? <span>Crear</span> : <LoadingSpinner />}
        </Button>
      </form>
    </Box>
  )
}

export default WithAuth(CreateStorePage)