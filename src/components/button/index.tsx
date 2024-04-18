import React from 'react'
import { StyledButton } from './styles'

export interface ButtonProps {
  children: React.ReactNode
}
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}
