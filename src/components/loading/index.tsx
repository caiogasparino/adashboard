import React from 'react'
import { Oval } from 'react-loader-spinner'
import { useTheme } from 'styled-components'
import { LoadingText, Overlay } from './styles'

interface LoadingProps {
  isLoading: boolean
  spinner?: boolean
}

const Loading: React.FC<LoadingProps> = ({ isLoading, spinner }) => {
  const { COLORS } = useTheme()
  if (!isLoading) return null

  return (
    <>
      {spinner && (
        <Oval
          visible={true}
          height="35"
          width="35"
          color={COLORS.background}
          secondaryColor={COLORS.background}
          ariaLabel="oval-loading"
          wrapperStyle={{ marginTop: '20px' }}
          wrapperClass=""
        />
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
