import React from 'react';
import { render, screen  } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RepositoryCard } from '../../components/Repository/RepositoryCard';
import { lightTheme } from '../../theme';
import { Repository } from '../../types';

const mockRepository: Repository = {
  id: 1,
  name: 'test-repo',
  full_name: 'godaddy/test-repo',
  description: 'A test repository',
  html_url: 'https://github.com/godaddy/test-repo',
  language: 'TypeScript',
  forks_count: 42,
  open_issues_count: 3,
  watchers_count: 100,
  stargazers_count: 250,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
  topics: ['web', 'typescript'],
  size: 1024,
  default_branch: 'main',
  archived: false,
  disabled: false,
  private: false,
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ThemeProvider theme={lightTheme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('RepositoryCard', () => {
  it('renders repository information correctly', () => {
    renderWithProviders(<RepositoryCard repository={mockRepository} />);
    
    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument(); // stars
    expect(screen.getByText('42')).toBeInTheDocument(); // forks
    expect(screen.getByText('3')).toBeInTheDocument(); // issues
    expect(screen.getByText('100')).toBeInTheDocument(); // watchers
  });

  it('handles missing description', () => {
    const repoWithoutDescription = { ...mockRepository, description: null };
    renderWithProviders(<RepositoryCard repository={repoWithoutDescription} />);
    
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  it('handles missing language', () => {
    const repoWithoutLanguage = { ...mockRepository, language: null };
    renderWithProviders(<RepositoryCard repository={repoWithoutLanguage} />);
    
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('formats update date correctly', () => {
    renderWithProviders(<RepositoryCard repository={mockRepository} />);
    
    expect(screen.getByText(/Updated Dec 1, 2023/)).toBeInTheDocument();
  });

  it('shows correct issue badge variant', () => {
    renderWithProviders(<RepositoryCard repository={mockRepository} />);
    
    expect(screen.getByText('3 issues')).toBeInTheDocument();
  });

  it('has clickable GitHub link', () => {
    renderWithProviders(<RepositoryCard repository={mockRepository} />);
    
    const githubLink = screen.getByText('View on GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/godaddy/test-repo');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});