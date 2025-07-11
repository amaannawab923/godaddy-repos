import { renderHook, waitFor } from '@testing-library/react';
import { useRepositories } from '../../hooks/useRepositories';

// Mock fetch
global.fetch = jest.fn();

describe('useRepositories', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches repositories successfully', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'godaddy/test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/godaddy/test-repo',
        language: 'JavaScript',
        forks_count: 10,
        open_issues_count: 2,
        watchers_count: 50,
        stargazers_count: 100,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        topics: [],
        size: 1024,
        default_branch: 'main',
        archived: false,
        disabled: false,
        private: false,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const { result } = renderHook(() => useRepositories());

    expect(result.current.loading).toBe(true);
    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repositories).toEqual(mockRepos);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useRepositories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  it('handles HTTP error response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => useRepositories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBe('HTTP error! status: 404');
  });
});