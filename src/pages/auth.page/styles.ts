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

  h5 {
    color: ${colors.white};
  }
  p {
    color: ${colors.white};
  }
`

export const Title = styled.h1`
  margin-bottom: 24px;
`

export const Text = styled.h4`
  margin-bottom: 5px;
  color: ${colors.red};
`

export const Description = styled.p`
  margin-bottom: 24px;
  color: ${colors.white};
`

export const Logo = styled.img`
  margin-bottom: 24px;
`

export const Button = styled.button`
  background: ${colors.blueDark};
  border-radius: 8px;
  border: 0;
  color: #fff;
  font-weight: bold;
  height: 56px;
  margin-top: 16px;
  padding: 0 32px;
  width: 100%;
  transition: background-color 0.2s;
  &:hover {
    background: ${colors.blueDark};
    filter: brightness(0.9);
  }
  &:click {
    background: ${colors.blueDark};
    filter: brightness(0.2);
  }
  h3 {
    color: ${colors.white};
  }
  @media (max-width: 600px) {
    width: 70%;
  }
`

export const Footer = styled.footer`
  margin-top: 24px;
  color: ${colors.white};
  text-align: center;
`
