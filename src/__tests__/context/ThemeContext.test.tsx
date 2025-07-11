import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});



const TestComponent: React.FC = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-mode">{isDarkMode ? 'dark' : 'light'}</div>
      <div data-testid="background-color">{theme.colors.background}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  it('provides light theme by default', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode').textContent).toBe('light');
    expect(screen.getByTestId('background-color').textContent).toBe('#FFFFFF');
  });

  it('loads saved theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('toggles theme correctly', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('throws error when useTheme is used outside ThemeProvider', async () => {
    const TestComponentWithoutProvider = () => {
      useTheme();
      return <div>Test</div>;
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await expect(async () => {
      render(<TestComponentWithoutProvider />);
    }).rejects.toThrow('useTheme must be used within a ThemeProvider');
    
    consoleSpy.mockRestore();
  });
});