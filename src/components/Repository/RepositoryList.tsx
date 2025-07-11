import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Search, Filter, Github, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Repository } from '../../types';
import { RepositoryCard } from './RepositoryCard';
import { ToggleSwitch } from '../UI/ToggleSwitch';
import { ThemeProps } from '../../types';

const ListContainer = styled.div`
  padding: 20px 0;
  width: 100%;
  overflow-x: hidden;
`;

const SearchContainer = styled.div`
  margin-bottom: 32px;
`;

const SearchInputContainer = styled.div<ThemeProps>`
  position: relative;
  margin-bottom: 24px;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input<ThemeProps>`
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ControlLabel = styled.label<ThemeProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }
`;

const SelectContainer = styled.div<ThemeProps>`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
  }
`;

const Select = styled.select<ThemeProps>`
  padding: 10px 32px 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  min-width: 160px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  @media (max-width: 480px) {
    min-width: 140px;
    width: 100%;
  }
`;

const SortOrderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SortOrderLabel = styled.span<ThemeProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const LanguageSelect = styled(Select)`
  min-width: 180px;

  @media (max-width: 480px) {
    min-width: 160px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;
    padding: 0 4px;
  }

  @media (max-width: 390px) {
    padding: 0 2px;
  }

  @media (max-width: 768px) and (min-width: 481px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
`;

const ResultsHeader = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 16px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EmptyState = styled.div<ThemeProps>`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ClearButton = styled.button<ThemeProps>`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: 6px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

type SortBy = 'name' | 'updated' | 'stars';
type SortOrder = 'asc' | 'desc';

interface RepositoryListProps {
  repositories: Repository[];
}

export const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('updated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const languages = useMemo(() => {
    const langSet = new Set<string>();
    repositories.forEach(repo => {
      if (repo.language) {
        langSet.add(repo.language);
      }
    });
    return Array.from(langSet).sort();
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    let filtered = repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });

    // Sort repositories
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'stars':
          comparison = a.stargazers_count - b.stargazers_count;
          break;
        case 'updated':
        default:
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [repositories, searchTerm, selectedLanguage, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
    setSortBy('updated');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchTerm || selectedLanguage !== 'all';

  const getSortLabel = () => {
    const labels = {
      name: 'Name',
      updated: 'Recently Updated',
      stars: 'Most Stars'
    };
    return labels[sortBy];
  };

  return (
    <ListContainer>
      <SearchContainer>
        <SearchInputContainer>
          <Search />
          <SearchInput
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputContainer>
        
        <ControlsContainer>
          <ControlGroup>
            <ControlLabel>
              <ArrowUpDown />
              Sort By
            </ControlLabel>
            <SortContainer>
              <SelectContainer>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                  <option value="name">Name</option>
                </Select>
              </SelectContainer>
              <SortOrderContainer>
                <SortOrderLabel>
                  {sortOrder === 'asc' ? <ArrowUp /> : <ArrowDown />}
                  {sortOrder === 'asc' ? 'ASC' : 'DESC'}
                </SortOrderLabel>
                <ToggleSwitch
                  isOn={sortOrder === 'desc'}
                  onToggle={toggleSortOrder}
                  size="small"
                />
              </SortOrderContainer>
            </SortContainer>
          </ControlGroup>

          <ControlGroup>
            <ControlLabel>
              <Filter />
              Language Filter
            </ControlLabel>
            <SelectContainer>
              <LanguageSelect
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="all">All Languages ({repositories.length})</option>
                {languages.map(language => {
                  const count = repositories.filter(repo => repo.language === language).length;
                  return (
                    <option key={language} value={language}>
                      {language} ({count})
                    </option>
                  );
                })}
              </LanguageSelect>
            </SelectContainer>
          </ControlGroup>
        </ControlsContainer>

        {hasActiveFilters && (
          <ClearButton onClick={clearFilters}>
            Clear All Filters
          </ClearButton>
        )}
      </SearchContainer>

      <ResultsHeader>
        <span><strong>{filteredRepositories.length}</strong> repositories found</span>
        <ResultsInfo>
          <span>
            Sorted by <strong>{getSortLabel()}</strong> ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </span>
          {(selectedLanguage !== 'all' || searchTerm) && (
            <span>
              {selectedLanguage !== 'all' && `Language: ${selectedLanguage}`}
              {selectedLanguage !== 'all' && searchTerm && ' • '}
              {searchTerm && `Search: "${searchTerm}"`}
            </span>
          )}
        </ResultsInfo>
      </ResultsHeader>

      {filteredRepositories.length === 0 ? (
        <EmptyState>
          <Github />
          <h3>No repositories found</h3>
          <p>Try adjusting your search or filters</p>
        </EmptyState>
      ) : (
        <Grid>
          {filteredRepositories.map(repo => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </Grid>
      )}
    </ListContainer>
  );
};