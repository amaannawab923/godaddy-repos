import React from 'react';
import { Container } from '../components/Layout/GlobalStyles';
import { RepositoryDetails } from '../components/Repository/RepositoryDetails';
import { Loading } from '../components/UI/Loading';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { useRepositories } from '../hooks/useRepositories';

export const RepositoryDetailsPage: React.FC = () => {
  const { repositories, loading, error, refetch } = useRepositories();

  if (loading) {
    return (
      <Container>
        <Loading message="Loading repository details..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage
          title="Failed to load repository details"
          message={error}
          onRetry={refetch}
        />
      </Container>
    );
  }

  return (
    <Container>
      <RepositoryDetails repositories={repositories} />
    </Container>
  );
};