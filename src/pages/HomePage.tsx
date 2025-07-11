import React from 'react';
import { Container } from '../components/Layout/GlobalStyles';
import { RepositoryList } from '../components/Repository/RepositoryList';
import { Loading } from '../components/UI/Loading';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { useRepositories } from '../hooks/useRepositories';

export const HomePage: React.FC = () => {
  const { repositories, loading, error, refetch } = useRepositories();

  if (loading) {
    return (
      <Container>
        <Loading message="Loading GoDaddy repositories..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage
          title="Failed to load repositories"
          message={error}
          onRetry={refetch}
        />
      </Container>
    );
  }

  return (
    <Container>
      <RepositoryList repositories={repositories} />
    </Container>
  );
};