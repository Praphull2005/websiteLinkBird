import { Lead, Campaign, LeadStatus, CampaignStatus, LeadStatusType, LinkedInAccount, LinkedInAccountStatus } from '../types';

const firstNames = ['Om', 'Dr. Bhuvaneshwari', 'Surdeep', 'Dilbag', 'Vamshy', 'Sunil', 'Utkarsh', 'Shreya', 'Aria', 'Leo', 'Zoe', 'Kai'];
const lastNames = ['Satyarthy', 'H.', 'Singh', 'Singh', 'Jain', 'Pal', 'K.', 'Ramakrishna', 'Smith', 'Johnson', 'Williams', 'Brown'];
const titles = ['Regional Head', 'Fertility & Women\'s Health', 'Building Product-led SEO Growt..', 'Manager Marketing & Communicat..', 'Ayurveda[primary infertility]...', 'Helping Fashion & Lifestyle Br..', 'Ex- The Skin Sto..', 'Deputy Manager - Founder\'s Off..', 'CEO', 'Marketing Lead', 'Sales Director'];
const campaignNames = ['Gynoveda', 'Digi Sidekick', 'The skin story', 'Pokonut', 'Juicy chemistry', 'Hyugalife'];
const leadStatuses: LeadStatus[] = [
    { type: 'Pending Approval' },
    { type: 'Sent', timeAgo: '7 mins ago' },
    { type: 'Do Not Contact' },
    { type: 'Followup', timeAgo: '10 mins ago' }
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const generateMockLeads = (count: number): Lead[] => {
  const leads: Lead[] = [];
  for (let i = 1; i <= count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const company = getRandomElement(campaignNames);
    leads.push({
      id: `lead_${i}`,
      name: `${firstName} ${lastName}`,
      title: getRandomElement(titles),
      avatarUrl: `https://i.pravatar.cc/40?u=lead${i}`,
      email: `${firstName.toLowerCase().split(' ').join('')}@example.com`,
      company: company,
      campaignName: company,
      activity: [getRandomNumber(0,4), getRandomNumber(0,4), getRandomNumber(0,4), getRandomNumber(0,4), getRandomNumber(0,4)],
      status: getRandomElement(leadStatuses),
      lastContactDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
      interactionHistory: [
        { date: '2023-10-26', type: 'Email', notes: 'Initial outreach email sent.' },
        { date: '2023-11-05', type: 'Call', notes: 'Follow-up call, left voicemail.' },
      ],
    });
  }
  return leads;
};

export const mockCampaigns: Campaign[] = [
  { id: 'camp_1', name: 'Just Herbs', status: CampaignStatus.Active, totalLeads: 20, requestStatus: { sent: 20, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
  { id: 'camp_2', name: 'Juicy chemistry', status: CampaignStatus.Active, totalLeads: 11, requestStatus: { sent: 11, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
  { id: 'camp_3', name: 'Hyugalife 2', status: CampaignStatus.Active, totalLeads: 19, requestStatus: { sent: 19, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
  { id: 'camp_4', name: 'Honeyveda', status: CampaignStatus.Active, totalLeads: 3, requestStatus: { sent: 3, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
  { id: 'camp_5', name: 'HempStreet', status: CampaignStatus.Active, totalLeads: 7, requestStatus: { sent: 7, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
  { id: 'camp_6', name: 'HealthyHey 2', status: CampaignStatus.Inactive, totalLeads: 5, requestStatus: { sent: 5, opened: 0, replied: 0}, connectionStatus: { connected: 0, pending: 0 } },
];

export const mockLinkedInAccounts: LinkedInAccount[] = [
  {
    id: 'li_acc_1',
    name: 'Pulkit Garg',
    email: '1999pulkitgarg@gmail.com',
    avatarUrl: `https://i.pravatar.cc/40?u=li_acc_1`,
    status: LinkedInAccountStatus.Connected,
    requestsSent: 17,
    requestsLimit: 30,
  },
  {
    id: 'li_acc_2',
    name: 'Jivesh Lakhanpal',
    email: 'jiveshlakhanpal@gmail.com',
    avatarUrl: `https://i.pravatar.cc/40?u=li_acc_2`,
    status: LinkedInAccountStatus.Connected,
    requestsSent: 25,
    requestsLimit: 30,
  }
];