import React from 'react'
import { Oval } from 'react-loader-spinner'
import { useTheme } from 'styled-components'
import { Container, LoadingText, Overlay } from './styles'

interface LoadingProps {
  isLoading: boolean
  spinner?: boolean
  color?: string
}

const Loading: React.FC<LoadingProps> = ({ isLoading, spinner, color }) => {
  const { COLORS } = useTheme()
  if (!isLoading) return null

  return (
    <>
      {spinner && (
        <Container>
          <Oval
            visible={true}
            height="35"
            width="35"
            color={color || COLORS.background}
            secondaryColor={color || COLORS.background}
            ariaLabel="oval-loading"
            wrapperStyle={{ marginTop: '20px' }}
            wrapperClass=""
          />
        </Container>
      )}
      {!spinner && (
        <Overlay>
          <LoadingText>Loading...</LoadingText>
        </Overlay>
      )}
    </>
  )
}

export default Loading
