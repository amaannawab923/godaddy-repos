import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  ArrowLeft, 
  Star, 
  GitFork, 
  AlertCircle, 
  Eye, 
  Calendar, 
  ExternalLink,
  Code,
  Archive,
  Users
} from 'lucide-react';
import { Repository } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/Card';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { ThemeProps } from '../../types';

const DetailsContainer = styled.div`
  padding: 20px 0;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
`;

const RepoHeader = styled.div`
  margin-bottom: 32px;
`;

const RepoTitle = styled.h1<ThemeProps>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const RepoDescription = styled.p<ThemeProps>`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 24px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`;

const StatCard = styled(Card)<ThemeProps>`
  text-align: center;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: none;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const StatValue = styled.div<ThemeProps>`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const StatLabel = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const InfoItem = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 20px;
    height: 20px;
  }
`;

const InfoLabel = styled.span<ThemeProps>`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const StatusBadges = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

interface RepositoryDetailsProps {
  repositories: Repository[];
}

export const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({ repositories }) => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const repository = repositories.find(repo => repo.name === name);

  if (!repository) {
    return (
      <DetailsContainer>
        <BackButton onClick={() => navigate('/')} variant="outline">
          <ArrowLeft size={16} />
          Back to Repositories
        </BackButton>
        <Card>
          <CardContent>
            <h2>Repository not found</h2>
            <p>The repository "{name}" could not be found.</p>
          </CardContent>
        </Card>
      </DetailsContainer>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIssuesVariant = (count: number) => {
    if (count === 0) return 'success';
    if (count <= 5) return 'warning';
    return 'error';
  };

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate('/')} variant="outline">
        <ArrowLeft size={16} />
        Back to Repositories
      </BackButton>

      <RepoHeader>
        <RepoTitle>
          {repository.name}
          <StatusBadges>
            {repository.language && (
              <Badge variant="secondary">{repository.language}</Badge>
            )}
            {repository.archived && (
              <Badge variant="warning">
                <Archive size={12} />
                Archived
              </Badge>
            )}
            {repository.private && (
              <Badge variant="error">Private</Badge>
            )}
          </StatusBadges>
        </RepoTitle>
        
        <RepoDescription>
          {repository.description || 'No description available for this repository.'}
        </RepoDescription>
      </RepoHeader>

      <StatsGrid>
        <StatCard>
          <StatValue>{repository.stargazers_count.toLocaleString()}</StatValue>
          <StatLabel>
            <Star size={16} />
            Stars
          </StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{repository.forks_count.toLocaleString()}</StatValue>
          <StatLabel>
            <GitFork size={16} />
            Forks
          </StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{repository.open_issues_count.toLocaleString()}</StatValue>
          <StatLabel>
            <AlertCircle size={16} />
            Open Issues
          </StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{repository.watchers_count.toLocaleString()}</StatValue>
          <StatLabel>
            <Eye size={16} />
            Watchers
          </StatLabel>
        </StatCard>
      </StatsGrid>

      <InfoGrid>
        <InfoItem>
          <Calendar />
          <InfoLabel>Created</InfoLabel>
          <InfoValue>{formatDate(repository.created_at)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <Calendar />
          <InfoLabel>Last Updated</InfoLabel>
          <InfoValue>{formatDate(repository.updated_at)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <Code />
          <InfoLabel>Default Branch</InfoLabel>
          <InfoValue>{repository.default_branch}</InfoValue>
        </InfoItem>
        <InfoItem>
          <Users />
          <InfoLabel>Repository Size</InfoLabel>
          <InfoValue>{formatSize(repository.size * 1024)}</InfoValue>
        </InfoItem>
      </InfoGrid>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge variant="primary">
              ⭐ {repository.stargazers_count} stars
            </Badge>
            <Badge variant="secondary">
              🍴 {repository.forks_count} forks
            </Badge>
            <Badge variant={getIssuesVariant(repository.open_issues_count)}>
              🐛 {repository.open_issues_count} issues
            </Badge>
            <Badge variant="primary">
              👀 {repository.watchers_count} watchers
            </Badge>
          </div>
        </CardContent>
      </Card>

      <ActionButtons>
        <Button
          as="a"
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          <ExternalLink size={16} />
          View on GitHub
        </Button>
        <Button
          as="a"
          href={`${repository.html_url}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="large"
        >
          <AlertCircle size={16} />
          View Issues
        </Button>
      </ActionButtons>
    </DetailsContainer>
  );
};