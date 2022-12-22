import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'error'
  onClick?: Function,
  disabled?: boolean,
  type?: 'button' | 'reset' | 'submit'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick = () => { }, disabled = false, type = 'button', className = "" }) => {
  return (
    <button type={type} className={`rounded p-2 disabled:bg-opacity-70 dark:bg-${variant}-dark bg-${variant} ${className}`} onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button