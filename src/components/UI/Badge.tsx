import styled from 'styled-components';
import { ThemeProps } from '../../types';

interface BadgeProps extends ThemeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
}

const sizeConfigs = {
  small: {
    padding: '4px 8px',
    fontSize: '10px',
  },
  medium: {
    padding: '6px 12px',
    fontSize: '12px',
  },
} as const;

// Variant configurations
const getVariantStyles = (variant: BadgeProps['variant'], theme: any) => {
  const color = theme.colors[variant || 'primary'];
  return {
    backgroundColor: `${color}20`,
    color,
  };
};

export const Badge = styled.span<BadgeProps>`
  display: flex;
  align-items: center;
  border-radius: 6px;
  font-weight: 500;
  text-transform: uppercase;
  
  ${({ size = 'medium' }) => {
    const config = sizeConfigs[size];
    return `
      padding: ${config.padding};
      font-size: ${config.fontSize};
    `;
  }}

  ${({ variant = 'primary', theme }) => {
    const styles = getVariantStyles(variant, theme);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
    `;
  }}
`;