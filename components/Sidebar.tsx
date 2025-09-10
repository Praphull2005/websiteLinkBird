import React from 'react';
import { Page } from '../App';
import { 
  DashboardIcon, LeadsIcon, CampaignsIcon, MessagesIcon, LinkedInIcon, 
  SettingsIcon, ActivityLogIcon, UserLogsIcon, LogoutIcon, 
  ChevronLeftIcon, ChevronRightIcon, LinkbirdLogo, PersonalArrowDownIcon
} from './icons/Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ icon, label, isActive, isCollapsed, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full h-10 px-3 rounded-md transition-colors duration-200 text-sm font-medium ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <div className="flex items-center">
      {icon}
      <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {label}
      </span>
    </div>
    {badge && !isCollapsed && (
      <span className="ml-auto text-xs font-semibold text-white bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

const NavHeader: React.FC<{ label: string; isCollapsed: boolean; }> = ({ label, isCollapsed }) => (
    <h3 className={`px-3 mt-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {label}
    </h3>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isCollapsed, setCollapsed, onLogout }) => {
  
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className={`flex items-center overflow-hidden ${isCollapsed ? 'w-0' : 'w-auto'}`}>
           <LinkbirdLogo />
           <span className={`ml-2 text-xl font-bold text-gray-900 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            LinkBird
           </span>
        </div>
        <button
          onClick={() => setCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
        >
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>
      
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <nav className="p-4">
          <div className={`p-2 rounded-md mb-4 ${isCollapsed ? 'py-4' : ''} transition-all duration-300`}>
              <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-lg">
                      PE
                  </div>
                  <div className={`ml-3 overflow-hidden transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                      <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">Praphull</p>
                      <p className="text-xs text-gray-500 whitespace-nowrap">PL</p>
                  </div>
                  {!isCollapsed && <button className="ml-auto text-gray-500"><PersonalArrowDownIcon /></button>}
              </div>
          </div>

          <NavHeader label="Overview" isCollapsed={isCollapsed} />
          <div className="space-y-1">
            <NavItem label="Dashboard" icon={<DashboardIcon />} isActive={currentPage === 'Dashboard'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Dashboard')} />
            <NavItem label="Leads" icon={<LeadsIcon />} isActive={currentPage === 'Leads'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Leads')} />
            <NavItem label="Campaigns" icon={<CampaignsIcon />} isActive={currentPage === 'Campaigns'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Campaigns')} />
            <NavItem label="Messages" icon={<MessagesIcon />} isActive={currentPage === 'Messages'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Messages')} badge={14} />
            <NavItem label="LinkedIn Accounts" icon={<LinkedInIcon />} isActive={currentPage === 'LinkedIn Accounts'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('LinkedIn Accounts')} />
          </div>

          <NavHeader label="Settings" isCollapsed={isCollapsed} />
          <div className="space-y-1">
             <NavItem label="Setting & Billing" icon={<SettingsIcon />} isActive={currentPage === 'Setting & Billing'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Setting & Billing')} />
          </div>

          <NavHeader label="Admin Panel" isCollapsed={isCollapsed} />
          <div className="space-y-1">
             <NavItem label="Activity logs" icon={<ActivityLogIcon />} isActive={currentPage === 'Activity logs'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('Activity logs')} />
             <NavItem label="User logs" icon={<UserLogsIcon />} isActive={currentPage === 'User logs'} isCollapsed={isCollapsed} onClick={() => setCurrentPage('User logs')} />
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={onLogout}
            className="flex items-center w-full h-10 px-3 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium"
          >
            <LogoutIcon />
            <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;