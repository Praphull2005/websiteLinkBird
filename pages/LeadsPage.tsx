import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lead, LeadStatus, LeadStatusType } from '../types';
import { generateMockLeads } from '../constants/mockData';
import Sheet from '../components/Sheet';
import { SearchIcon, PendingIcon, ClockIcon, BlockIcon, FollowupArrowIcon } from '../components/icons/Icons';

const ALL_LEADS = generateMockLeads(500);
const LEADS_PER_PAGE = 30;

const SkeletonRow: React.FC = () => (
    <tr className="border-b border-gray-200 animate-pulse">
        <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded w-3/4"></div></td>
        <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded w-2/3"></div></td>
        <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded w-1/4"></div></td>
        <td className="px-6 py-4"><div className="h-5 bg-gray-200 rounded w-1/2"></div></td>
    </tr>
);

const ActivityBars: React.FC<{ values: number[] }> = ({ values }) => (
    <div className="flex items-end gap-0.5 h-4">
        {values.map((v, i) => (
            <div key={i} className="w-1" style={{ height: `${Math.max(25, v * 25)}%`, backgroundColor: v > 0 ? '#fbbf24' : '#d4d4d8' }} />
        ))}
    </div>
);

const statusStyles: Record<LeadStatusType, { icon: React.ReactNode; className: string }> = {
    'Pending Approval': { icon: <PendingIcon />, className: 'bg-purple-100 text-purple-700' },
    'Sent': { icon: <ClockIcon />, className: 'bg-gray-100 text-gray-600' },
    'Do Not Contact': { icon: <BlockIcon />, className: 'bg-red-100 text-red-700' },
    'Followup': { icon: <FollowupArrowIcon />, className: 'bg-blue-100 text-blue-700' },
};

const LeadStatusBadge: React.FC<{ status: LeadStatus }> = ({ status }) => {
    const style = statusStyles[status.type];
    if (!style) return null;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${style.className}`}>
            {style.icon}
            <span>{status.type === 'Sent' || status.type === 'Followup' ? `${status.type} ${status.timeAgo}` : status.type}</span>
        </div>
    );
};

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  // FIX: Initialize useRef with null to provide an argument, which is expected.
  const observer = useRef<IntersectionObserver | null>(null);

  const lastLeadElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const newLeads = ALL_LEADS.slice(0, page * LEADS_PER_PAGE);
      setLeads(newLeads);
      setHasMore(newLeads.length < ALL_LEADS.length);
      setIsLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, [page]);
  
  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="text-gray-900">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Name</th>
                <th scope="col" className="px-6 py-3 font-medium">Campaign Name</th>
                <th scope="col" className="px-6 py-3 font-medium">Activity</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {leads.map((lead, index) => (
                <tr
                  ref={leads.length === index + 1 ? lastLeadElementRef : null}
                  key={lead.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectLead(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                          <img src={lead.avatarUrl} alt={lead.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-semibold text-gray-900">{lead.name}</div>
                            <div className="text-xs">{lead.title}</div>
                          </div>
                      </div>
                  </td>
                  <td className="px-6 py-4">{lead.campaignName}</td>
                  <td className="px-6 py-4"><ActivityBars values={lead.activity} /></td>
                  <td className="px-6 py-4"><LeadStatusBadge status={lead.status} /></td>
                </tr>
              ))}
              {isLoading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={`skeleton-${i}`} />)}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedLead && (
        <Sheet isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Lead Details">
          <div className="space-y-6 text-sm">
              <div className="flex items-center gap-4">
                  <img src={selectedLead.avatarUrl} alt={selectedLead.name} className="w-16 h-16 rounded-full" />
                  <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedLead.name}</h3>
                      <p className="text-gray-500">{selectedLead.company}</p>
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <p className="text-gray-500">Email</p>
                      <p className="text-gray-800">{selectedLead.email}</p>
                  </div>
                   <div>
                      <p className="text-gray-500">Status</p>
                      <LeadStatusBadge status={selectedLead.status} />
                  </div>
                   <div>
                      <p className="text-gray-500">Campaign</p>
                      <p className="text-gray-800">{selectedLead.campaignName}</p>
                  </div>
                   <div>
                      <p className="text-gray-500">Last Contact</p>
                      <p className="text-gray-800">{selectedLead.lastContactDate}</p>
                  </div>
              </div>

              <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interaction History</h4>
                  <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                      {selectedLead.interactionHistory.map((item, index) => (
                          <div key={index}>
                              <p className="font-semibold text-gray-800">{item.type} on {item.date}</p>
                              <p className="text-gray-500">{item.notes}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Update Status</button>
              </div>
          </div>
        </Sheet>
      )}
    </div>
  );
};

export default LeadsPage;