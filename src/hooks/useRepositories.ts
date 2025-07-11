import { useState, useEffect } from 'react';
import { Repository } from '../types';

interface UseRepositoriesReturn {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useRepositories = (): UseRepositoriesReturn => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.github.com/orgs/godaddy/repos?per_page=100');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setRepositories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
  };
};