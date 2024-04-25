import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const Content = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 100%;
  background: ${props => props.theme.COLORS.backgroundColor};
  @media screen and (max-width: 768px) {
    height: auto;
  }
`

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.COLORS.secondary};
  width: 20%;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`
