import React, { createContext, useEffect, useState } from 'react'

export const ErrorContext = createContext<{ errorMessage?: string, setErrorMessage: Function }>({
  errorMessage: undefined,
  setErrorMessage: () => { }
})



const ErrorContextContainer = ({ children }: any) => {
  const [errorMessage, setErrorMessage] = useState(undefined)
  return (
    <ErrorContext.Provider value={{ setErrorMessage, errorMessage }}>
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorContextContainer