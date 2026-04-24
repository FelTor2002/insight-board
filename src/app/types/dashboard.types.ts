export type TransactionStatus = 'Completed' | 'Pending' | 'Cancelled';

export interface Transaction {
  id: string;
  customer: string;
  category: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  channel: string;
}

export interface DashboardFilter {
  category: string;
  status: TransactionStatus | 'All';
  search: string;
  dateFrom: string;
  dateTo: string;
}

export interface KpiMetric {
  label: string;
  value: string;
  trend: string;
  trendPositive: boolean;
}
