import React from 'react';
import { mockCampaigns } from '../constants/mockData';
import { generateMockLeads } from '../constants/mockData';
import { mockLinkedInAccounts } from '../constants/mockData';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { Lead, LeadStatus, LeadStatusType, LinkedInAccount, LinkedInAccountStatus, Campaign } from '../types';
import { 
    PendingIcon, ClockIcon, BlockIcon, FollowupArrowIcon, CheckCircleIcon, LinkedInSquareIcon, ChevronDownIcon
} from '../components/icons/Icons';


const Card: React.FC<{
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, action, children, className }) => (
  <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 className="font-semibold text-gray-800">{title}</h2>
      {action}
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

const DropdownButton: React.FC<{ text: string }> = ({ text }) => (
    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
        {text}
        <ChevronDownIcon className="w-3 h-3" />
    </button>
);

const statusStyles: Record<LeadStatusType, { icon: React.ReactNode; className: string }> = {
    'Pending Approval': { icon: <PendingIcon />, className: 'bg-purple-100 text-purple-700' },
    'Sent': { icon: <ClockIcon />, className: 'bg-orange-100 text-orange-700' },
    'Do Not Contact': { icon: <BlockIcon />, className: 'bg-gray-200 text-gray-700' },
    'Followup': { icon: <FollowupArrowIcon />, className: 'bg-blue-100 text-blue-700' },
};

const LeadStatusBadge: React.FC<{ status: LeadStatus }> = ({ status }) => {
    const style = statusStyles[status.type];
    if (!style) return null;

    const text = status.type === 'Sent' && status.timeAgo ? `Sent ${status.timeAgo}` : status.type;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${style.className}`}>
            {style.icon}
            <span>{text}</span>
        </div>
    );
};

const CampaignsCard: React.FC<{campaigns: Campaign[]}> = ({campaigns}) => (
    <Card title="Campaigns" action={<DropdownButton text="All Campaigns" />}>
        <ul className="space-y-3">
            {campaigns.slice(0, 6).map(campaign => (
                <li key={campaign.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">{campaign.name}</span>
                    <Badge status={campaign.status} />
                </li>
            ))}
        </ul>
    </Card>
);

const RecentActivityCard: React.FC<{leads: Lead[]}> = ({leads}) => (
    <Card title="Recent Activity" action={<DropdownButton text="Most Recent" />}>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-xs text-gray-500">
                        <th className="pb-2 font-medium">Lead</th>
                        <th className="pb-2 font-medium">Campaign</th>
                        <th className="pb-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.slice(0, 8).map(lead => (
                        <tr key={lead.id} className="border-t border-gray-200">
                            <td className="py-3 pr-2">
                                <div className="flex items-center gap-3">
                                    <img src={lead.avatarUrl} alt={lead.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-gray-900 truncate">{lead.name.split(' ')[0]} {lead.name.split(' ')[1]}</div>
                                        <div className="text-xs text-gray-500 truncate">{lead.title}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-2 text-gray-600">{lead.campaignName}</td>
                            <td className="py-3 pl-2"><LeadStatusBadge status={lead.status} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

const LinkedInAccountsCard: React.FC<{accounts: LinkedInAccount[]}> = ({accounts}) => (
    <Card title="LinkedIn Accounts" className="mt-6">
        <div className="overflow-x-auto">
             <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-xs text-gray-500">
                        <th className="pb-2 font-medium">Account</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id} className="border-t border-gray-200">
                            <td className="py-3 pr-2">
                                <div className="flex items-center gap-3">
                                    <img src={account.avatarUrl} alt={account.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{account.name}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <LinkedInSquareIcon className="text-gray-400"/>
                                            {account.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-2">
                                {account.status === LinkedInAccountStatus.Connected && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                                        <CheckCircleIcon />
                                        <span>Connected</span>
                                    </div>
                                )}
                            </td>
                            <td className="py-3 pl-2">
                                <div className="flex items-center gap-2">
                                    <ProgressBar value={(account.requestsSent / account.requestsLimit) * 100} />
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{account.requestsSent}/{account.requestsLimit}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);


const DashboardPage: React.FC = () => {
    // Using static mock data for consistency on dashboard
    const campaigns = mockCampaigns;
    const leads = generateMockLeads(8);
    const linkedInAccounts = mockLinkedInAccounts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <CampaignsCard campaigns={campaigns} />
            <LinkedInAccountsCard accounts={linkedInAccounts} />
        </div>
        <div className="lg:col-span-2">
            <RecentActivityCard leads={leads} />
        </div>
    </div>
  );
};

export default DashboardPage;
