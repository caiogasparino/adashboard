import styled from 'styled-components'
import { ButtonProps } from '.'

export const StyledButton = styled.button<ButtonProps>`
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};
  border: 0;
  border-radius: 8px;
  padding: 10px 16px;
  margin-vertical: 16px;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
