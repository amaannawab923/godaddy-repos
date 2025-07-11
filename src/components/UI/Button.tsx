import styled from 'styled-components';
import { ThemeProps } from '../../types';

interface ButtonProps extends ThemeProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
  min-width: 0;
  word-wrap: break-word;
  
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
          height: 36px;
        `;
      case 'large':
        return `
          padding: 16px 24px;
          font-size: 16px;
          height: 52px;
        `;
      default:
        return `
          padding: 12px 20px;
          font-size: 14px;
          height: 44px;
        `;
    }
  }}

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 10px 12px;
    height: 40px;
    
    &[size="small"] {
      padding: 8px 12px;
      font-size: 12px;
      height: 36px;
    }
  }

  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover {
            background-color: ${theme.colors.secondary}dd;
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${theme.colors.primary}dd;
            transform: translateY(-2px);
          }
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;