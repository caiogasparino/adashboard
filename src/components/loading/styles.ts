import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.COLORS.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const LoadingText = styled.p`
  color: white;
  font-size: 24px;
`
