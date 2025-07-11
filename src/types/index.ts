export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  size: number;
  default_branch: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

export interface ThemeProps {
  theme: Theme;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    hover: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}