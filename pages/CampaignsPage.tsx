import React, { useState } from 'react';
import { Campaign } from '../types';
import { mockCampaigns } from '../constants/mockData';
import Badge from '../components/Badge';
import { SearchIcon, UserIcon, PaperPlaneIcon, EyeIcon, ReplyIcon, ConnectIcon, PendingConnectIcon } from '../components/icons/Icons';

const CampaignsPage: React.FC = () => {
    const campaigns = mockCampaigns;
    const [activeTab, setActiveTab] = useState('All Campaigns');
    
    const TabButton: React.FC<{label: string}> = ({label}) => (
        <button 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeTab === label ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab(label)}
        >
            {label}
        </button>
    );

  return (
    <div className="text-gray-900 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Campaigns</h1>
            <p className="mt-1 text-gray-500">Manage your campaigns and track their performance.</p>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                <TabButton label="All Campaigns" />
                <TabButton label="Active" />
                <TabButton label="Inactive" />
            </div>
            <div className="flex items-center gap-4">
                 <div className="relative w-full max-w-xs">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search campaigns..."
                        className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">
                    Create Campaign
                </button>
            </div>
        </div>

        {/* Campaigns Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-3">Campaign Name</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Total Leads</div>
            <div className="col-span-3">Request Status</div>
            <div className="col-span-3">Connection Status</div>
        </div>
        
        {/* Campaigns List */}
        <div className="space-y-3">
              {campaigns.map((campaign) => (
                    <div key={campaign.id} className="grid grid-cols-12 gap-4 items-center bg-white border border-gray-200 rounded-lg p-4 text-sm hover:shadow-md transition-shadow duration-200">
                        <div className="col-span-3 font-semibold text-gray-900">{campaign.name}</div>
                        <div className="col-span-2"><Badge status={campaign.status} /></div>
                        <div className="col-span-1 flex items-center gap-2 text-gray-600">
                            <UserIcon /> 
                            <span>{campaign.totalLeads}</span>
                        </div>
                        <div className="col-span-3 flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1.5" title="Sent">
                                <PaperPlaneIcon className="text-blue-500" />
                                <span>{campaign.requestStatus.sent}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Opened">
                                <EyeIcon className="text-yellow-500"/>
                                <span>{campaign.requestStatus.opened}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Replied">
                                <ReplyIcon className="text-green-500"/>
                                <span>{campaign.requestStatus.replied}</span>
                            </div>
                        </div>
                        <div className="col-span-3 flex items-center gap-4 text-gray-600">
                           <div className="flex items-center gap-1.5" title="Connected">
                                <ConnectIcon className="text-green-500"/>
                                <span>{campaign.connectionStatus.connected}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Pending Connection">
                                <PendingConnectIcon className="text-gray-400"/>
                                <span>{campaign.connectionStatus.pending}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
  );
};

export default CampaignsPage;