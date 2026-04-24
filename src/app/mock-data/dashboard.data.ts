import { Transaction, TransactionStatus } from '../types/dashboard.types';

export const CATEGORY_OPTIONS = ['All', 'Software', 'Marketing', 'Hardware', 'Consulting', 'Support'];

export const STATUS_OPTIONS: Array<TransactionStatus | 'All'> = ['All', 'Completed', 'Pending', 'Cancelled'];

export const TRANSACTIONS: Transaction[] = [
  { id: 'TRX-1001', customer: 'Atlas Corp', category: 'Software', amount: 4200, status: 'Completed', date: '2026-01-04', channel: 'Web' },
  { id: 'TRX-1002', customer: 'Nova Retail', category: 'Marketing', amount: 1800, status: 'Pending', date: '2026-01-10', channel: 'Referral' },
  { id: 'TRX-1003', customer: 'Pulse Finance', category: 'Consulting', amount: 5100, status: 'Completed', date: '2026-01-18', channel: 'Sales Team' },
  { id: 'TRX-1004', customer: 'Orion Labs', category: 'Hardware', amount: 2300, status: 'Cancelled', date: '2026-01-26', channel: 'Web' },
  { id: 'TRX-1005', customer: 'Zenith Studio', category: 'Support', amount: 950, status: 'Completed', date: '2026-02-03', channel: 'Partner' },
  { id: 'TRX-1006', customer: 'BluePeak', category: 'Software', amount: 3900, status: 'Completed', date: '2026-02-11', channel: 'Web' },
  { id: 'TRX-1007', customer: 'Eclipse Health', category: 'Consulting', amount: 4600, status: 'Pending', date: '2026-02-17', channel: 'Sales Team' },
  { id: 'TRX-1008', customer: 'Mira Foods', category: 'Marketing', amount: 2100, status: 'Completed', date: '2026-02-25', channel: 'Referral' },
  { id: 'TRX-1009', customer: 'Quantum Works', category: 'Hardware', amount: 2800, status: 'Completed', date: '2026-03-02', channel: 'Partner' },
  { id: 'TRX-1010', customer: 'Beacon Mobility', category: 'Support', amount: 1200, status: 'Cancelled', date: '2026-03-09', channel: 'Web' },
  { id: 'TRX-1011', customer: 'Summit Trade', category: 'Software', amount: 4400, status: 'Completed', date: '2026-03-13', channel: 'Web' },
  { id: 'TRX-1012', customer: 'Aster Dynamics', category: 'Consulting', amount: 5300, status: 'Completed', date: '2026-03-21', channel: 'Sales Team' },
  { id: 'TRX-1013', customer: 'Vertex Learn', category: 'Marketing', amount: 1950, status: 'Pending', date: '2026-03-27', channel: 'Referral' },
  { id: 'TRX-1014', customer: 'Lyra Digital', category: 'Software', amount: 4700, status: 'Completed', date: '2026-04-01', channel: 'Web' },
  { id: 'TRX-1015', customer: 'Polar Logistics', category: 'Hardware', amount: 2500, status: 'Completed', date: '2026-04-08', channel: 'Partner' },
  { id: 'TRX-1016', customer: 'Cobalt Energy', category: 'Consulting', amount: 5800, status: 'Completed', date: '2026-04-14', channel: 'Sales Team' },
  { id: 'TRX-1017', customer: 'Nimbus Homes', category: 'Support', amount: 1350, status: 'Pending', date: '2026-04-19', channel: 'Referral' },
  { id: 'TRX-1018', customer: 'Tera Systems', category: 'Marketing', amount: 2250, status: 'Completed', date: '2026-04-22', channel: 'Web' }
];