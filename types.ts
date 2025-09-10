export type LeadStatusType = 'Pending Approval' | 'Sent' | 'Do Not Contact' | 'Followup';

export interface LeadStatus {
    type: LeadStatusType;
    timeAgo?: string;
}

export enum CampaignStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface Lead {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  company: string;
  campaignName: string;
  activity: number[];
  status: LeadStatus;
  lastContactDate: string;
  interactionHistory: {
    date: string;
    type: 'Email' | 'Call' | 'Meeting';
    notes: string;
  }[];
}

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  totalLeads: number;
  requestStatus: {
    sent: number;
    opened: number;
    replied: number;
  };
  connectionStatus: {
    connected: number;
    pending: number;
  };
}

export enum LinkedInAccountStatus {
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface LinkedInAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: LinkedInAccountStatus;
  requestsSent: number;
  requestsLimit: number;
}
