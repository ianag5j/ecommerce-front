import React from 'react'

const Box = ({ children, className = '' }) => {
  return (
    <div className={`dark:bg-surface-dark bg-surface p-3 rounded-md flex flex-col gap-2 shadow-lg w-full ${className}`}>
      {children}
    </div>
  )
}

export default Box