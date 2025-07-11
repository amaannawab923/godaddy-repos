import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { GlobalStyles } from './components/Layout/GlobalStyles';
import { Header } from './components/Layout/Header';
import { HomePage } from './pages/HomePage';
import { RepositoryDetailsPage } from './pages/RepositoryDetailsPage';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repository/:name" element={<RepositoryDetailsPage />} />
        </Routes>
      </Router>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;