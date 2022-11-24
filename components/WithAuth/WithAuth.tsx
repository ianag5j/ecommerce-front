import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import LoadingSpinner from '../UI/LoadingSpinner'
const WithAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser()

    useEffect(() => {
      if (!isLoading && user === undefined) {
        router.replace('/api/auth/logout')
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return <LoadingSpinner />
    }
    return <Component />;
  };


  return AuthenticatedComponent
}

export default WithAuth