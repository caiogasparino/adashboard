// added styles
import styled from 'styled-components'
import { colors } from '../../design/colors'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${colors.primary};
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`

export const Logo = styled.img`
  margin-bottom: 24px;
`
