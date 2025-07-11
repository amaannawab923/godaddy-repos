import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { ThemeProps } from '../../types';
import { Button } from './Button';

const ErrorContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.error}30;
  margin: 20px 0;
`;

const ErrorIcon = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 16px;
`;

const ErrorTitle = styled.h3<ThemeProps>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

const ErrorDescription = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  max-width: 400px;
  line-height: 1.5;
`;

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon>
        <AlertTriangle size={48} />
      </ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{message}</ErrorDescription>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw size={16} />
          Try Again
        </Button>
      )}
    </ErrorContainer>
  );
};