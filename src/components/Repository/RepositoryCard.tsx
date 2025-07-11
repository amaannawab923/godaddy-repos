import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Star, GitFork, AlertCircle, Eye, Calendar } from 'lucide-react';
import { Repository } from '../../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { ThemeProps } from '../../types';

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LanguageBadge = styled(Badge)<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.accent}20;
  color: ${({ theme }) => theme.colors.accent};
`;

const UpdatedDate = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    margin: 16px -8px 0 -8px;
    padding: 0 8px;
    
    button, a {
      width: 100%;
      justify-content: center;
      margin: 0;
      box-sizing: border-box;
    }
  }

  @media (max-width: 390px) {
    margin: 16px -12px 0 -12px;
    padding: 0 12px;
  }
`;

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/repository/${repository.name}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusVariant = (openIssues: number) => {
    if (openIssues === 0) return 'success';
    if (openIssues <= 5) return 'warning';
    return 'error';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{repository.name}</CardTitle>
        <CardDescription>
          {repository.description || 'No description available'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <StatsContainer>
          <StatItem>
            <Star />
            <span>{repository.stargazers_count}</span>
          </StatItem>
          <StatItem>
            <GitFork />
            <span>{repository.forks_count}</span>
          </StatItem>
          <StatItem>
            <AlertCircle />
            <span>{repository.open_issues_count}</span>
          </StatItem>
          <StatItem>
            <Eye />
            <span>{repository.watchers_count}</span>
          </StatItem>
        </StatsContainer>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          {repository.language && (
            <LanguageBadge size="small">{repository.language}</LanguageBadge>
          )}
          <Badge variant={getStatusVariant(repository.open_issues_count)} size="small">
            {repository.open_issues_count} issues
          </Badge>
        </div>

        <UpdatedDate>
          <Calendar size={12} />
          Updated {formatDate(repository.updated_at)}
        </UpdatedDate>
      </CardContent>

      <CardFooter>
        <CardActions>
          <Button onClick={handleViewDetails} size="small">
            View Details
          </Button>
          <Button
            as="a"
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="small"
          >
            View on GitHub
          </Button>
        </CardActions>
      </CardFooter>
    </Card>
  );
};