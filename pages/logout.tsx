import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Logout = () => {
  Cookies.remove('sess')
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.replace('/')
  }
  return (
    <div></div>
  )
}

export default Logout