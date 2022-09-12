import React from 'react'

const Box = ({ children }) => {
  return (
    <div className='dark:bg-surface-dark bg-surface p-3 rounded-md flex flex-col gap-2 shadow-md'>
      {children}
    </div>
  )
}

export default Box