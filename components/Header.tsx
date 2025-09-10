import React from 'react';
import type { Page } from '../App';
import { 
    DashboardIcon, LeadsIcon, CampaignsIcon, MessagesIcon, LinkedInIcon, 
    SettingsIcon, ActivityLogIcon, UserLogsIcon 
} from './icons/Icons';

interface HeaderProps {
  currentPage: Page;
}

const PageIcon: React.FC<{ page: Page, className?: string }> = ({ page, className }) => {
    const props = { className: className || "w-5 h-5 text-gray-500" };
    switch (page) {
        case 'Dashboard': return <DashboardIcon {...props} />;
        case 'Leads': return <LeadsIcon {...props} />;
        case 'Campaigns': return <CampaignsIcon {...props} />;
        case 'Messages': return <MessagesIcon {...props} />;
        case 'LinkedIn Accounts': return <LinkedInIcon {...props} />;
        case 'Setting & Billing': return <SettingsIcon {...props} />;
        case 'Activity logs': return <ActivityLogIcon {...props} />;
        case 'User logs': return <UserLogsIcon {...props} />;
        default: return null;
    }
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header className="h-16 flex items-center px-6 border-b border-gray-200 bg-white flex-shrink-0">
      <div className="flex items-center text-lg font-semibold text-gray-800">
        <PageIcon page={currentPage} />
        <h1 className="ml-3">{currentPage}</h1>
      </div>
    </header>
  );
};

export default Header;