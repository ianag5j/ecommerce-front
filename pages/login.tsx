import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Box from '../components/Box'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { signIn } from '../services/auth'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await signIn(formData.get('userName') as string, formData.get('password') as string);
      router.push('/')
    } catch (error) {
      alert('Login Error')
    }
    setIsLoading(false)
  }
  return (
    <Box>
      <form action="" className='flex flex-col gap-3' onSubmit={onSubmit}>
        <input className='p-2 rounded border-solid border-b-2 dark:border-primary-dark border-primary' type="text" name='userName' required />
        <input className='p-2 rounded border-solid border-b-2 dark:border-primary-dark border-primary' type="password" name="password" required />
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? <span>Ingresar</span> : <LoadingSpinner />}
        </Button>
      </form>
    </Box>
  )
}

export default Login