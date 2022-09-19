import React from 'react'

interface BoxProps {
  children: React.ReactNode
  className?: string
}

const Box: React.FC<BoxProps> = ({ children, className = '' }) => {
  return (
    <div className={`dark:bg-surface-dark bg-surface p-3 rounded-md flex flex-col gap-2 shadow-lg w-full md:max-w-xl ${className}`}>
      {children}
    </div>
  )
}

export default Box