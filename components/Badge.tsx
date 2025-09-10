import React from 'react';
import { CampaignStatus } from '../types';

interface BadgeProps {
  status: CampaignStatus;
}

const statusColors: Record<CampaignStatus, { bg: string, text: string }> = {
  [CampaignStatus.Active]: { bg: 'bg-green-100', text: 'text-green-700' },
  [CampaignStatus.Inactive]: { bg: 'bg-gray-100', text: 'text-gray-700' },
};


const Badge: React.FC<BadgeProps> = ({ status }) => {
  const colors = statusColors[status];

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colors.bg} ${colors.text}`}>
      {status}
    </div>
  );
};

export default Badge;