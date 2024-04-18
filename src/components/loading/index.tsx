import React from 'react'
import { LoadingText, Overlay } from './styles'

interface LoadingProps {
  isLoading: boolean
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <Overlay>
      <LoadingText>Loading...</LoadingText>
    </Overlay>
  )
}

export default Loading
