import React from 'react';
import styled from 'styled-components';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeProps } from '../../types';
import { Logo } from '../Common/Logo';

const HeaderContainer = styled.header<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    padding: 0 12px;
  }

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const LogoContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ThemeToggle = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Logo />
          <span>GoDaddy Repos</span>
        </LogoContainer>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <Sun /> : <Moon />}
        </ThemeToggle>
      </HeaderContent>
    </HeaderContainer>
  );
};