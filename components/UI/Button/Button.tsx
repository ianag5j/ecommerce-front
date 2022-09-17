import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: Function,
  disabled?: boolean,
  type?: 'button' | 'reset' | 'submit'
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick = () => { }, disabled = false, type = 'button' }) => {
  return (
    <button type={type} className={`rounded p-2 disabled:bg-opacity-70 dark:bg-${variant}-dark bg-${variant}`} onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button