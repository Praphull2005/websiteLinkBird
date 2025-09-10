import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import CampaignsPage from './pages/CampaignsPage';
import SettingsPage from './pages/SettingsPage';

export type Page = 'Dashboard' | 'Leads' | 'Campaigns' | 'Messages' | 'LinkedIn Accounts' | 'Setting & Billing' | 'Activity logs' | 'User logs';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('Leads');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Leads':
        return <LeadsPage />;
      case 'Campaigns':
        return <CampaignsPage />;
      case 'Setting & Billing':
        return <SettingsPage />;
      case 'Messages':
      case 'LinkedIn Accounts':
      case 'Activity logs':
      case 'User logs':
         return <DashboardPage />; // Using Dashboard as a placeholder
      default:
        return <LeadsPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;