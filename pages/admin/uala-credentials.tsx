import React from 'react'
import WithAuth from '../../components/WithAuth'

const Adqui = () => {
  return (
    <iframe className='w-full h-screen' src={`https://web.stage.adquirencia.ar.ua.la/?callbackUrl=${process.env.NEXT_PUBLIC_BASE_URL}/redirect/uala`} frameBorder="0"></iframe>
  )
}

export default WithAuth(Adqui)