import styled from 'styled-components';
import { ThemeProps } from '../../types';

export const Card = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.2s ease;
  width: 100%;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: 8px;
  }

  @media (max-width: 390px) {
    padding: 16px 12px;
  }

  @media (max-width: 768px) and (min-width: 481px) {
    padding: 20px;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3<ThemeProps>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  line-height: 1.2;
  word-break: break-word;
`;

export const CardDescription = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const CardContent = styled.div`
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;