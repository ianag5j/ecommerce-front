import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const WithAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [isLoged, setIsLoged] = useState(true)

    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (!Cookies.get('sess')) {
          router.replace('/logout')
          setIsLoged(false)
        }
      }
    }, [router]);

    return !!isLoged ? <Component /> : null;
  };


  return AuthenticatedComponent
}

export default WithAuth