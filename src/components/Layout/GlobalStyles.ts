import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProps } from '../../types';

export const GlobalStyles = createGlobalStyle<ThemeProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Container = styled.div<ThemeProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  @media (max-width: 480px) {
    padding: 0 8px;
  }

  @media (max-width: 390px) {
    padding: 0 4px;
  }

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;