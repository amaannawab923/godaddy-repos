import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../../types';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  onLabel?: string;
  offLabel?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const SwitchContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case 'small': return '8px';
      case 'large': return '16px';
      default: return '12px';
    }
  }};
`;

const SwitchTrack = styled.div<ThemeProps & {
  isOn: boolean;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  position: relative;
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '44px';
      case 'large': return '64px';
      default: return '54px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '34px';
      default: return '28px';
    }
  }};
  background-color: ${({ theme, isOn, disabled }) => {
    if (disabled) return theme.colors.border;
    return isOn ? theme.colors.primary : theme.colors.textSecondary + '40';
  }};
  border-radius: ${({ size }) => {
    switch (size) {
      case 'small': return '12px';
      case 'large': return '17px';
      default: return '14px';
    }
  }};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  user-select: none;
  display: flex;
  align-items: center;
  
  &:hover {
    ${({ disabled, theme, isOn }) => !disabled && `
      background-color: ${isOn ? theme.colors.primary : theme.colors.textSecondary};
      transform: scale(1.05);
    `}
  }

  &:active {
    ${({ disabled }) => !disabled && `
      transform: scale(0.98);
    `}
  }

  &:focus-within {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SwitchThumb = styled.div<ThemeProps & {
  isOn: boolean;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>`
  position: relative;
  margin-left: ${({ isOn, size }) => {
    if (!isOn) return '0px';
    switch (size) {
      case 'small': return '20px';
      case 'large': return '30px';
      default: return '26px';
    }
  }};
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '30px';
      default: return '24px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '20px';
      case 'large': return '30px';
      default: return '24px';
    }
  }};
  background-color: ${({ disabled }) => disabled ? '#ccc' : 'white'};
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ size }) => {
    switch (size) {
      case 'small': return '8px';
      case 'large': return '12px';
      default: return '10px';
    }
  }};
    height: ${({ size }) => {
    switch (size) {
      case 'small': return '8px';
      case 'large': return '12px';
      default: return '10px';
    }
  }};
    background-color: ${({ theme, isOn, disabled }) => {
    if (disabled) return '#999';
    return isOn ? theme.colors.primary : theme.colors.textSecondary;
  }};
    border-radius: 50%;
    opacity: 0.4;
    transition: all 0.2s ease;
  }
`;


const Label = styled.span<ThemeProps & { disabled?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textSecondary : theme.colors.text};
  user-select: none;
  transition: color 0.2s ease;
`;

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  onLabel,
  offLabel,
  size = 'medium',
  disabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) {
        onToggle();
      }
    }
  };

  return (
    <SwitchContainer onClick={() => {
      console.log("clicked")
    }}
      size={size}>
      {offLabel && !isOn && (
        <Label disabled={disabled}>{offLabel}</Label>
      )}

      <SwitchTrack
        isOn={isOn}
        size={size}
        disabled={disabled}
        role="switch"
        aria-checked={isOn}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          onToggle()
        }}
        onKeyDown={handleKeyDown}
      >
        <SwitchThumb isOn={isOn} size={size} disabled={disabled} />
      </SwitchTrack>

      {onLabel && isOn && (
        <Label disabled={disabled}>{onLabel}</Label>
      )}
    </SwitchContainer>
  );
};