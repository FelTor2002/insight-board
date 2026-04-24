import { Component, inject } from '@angular/core';
import { CATEGORY_OPTIONS, STATUS_OPTIONS, TRANSACTIONS } from '../../mock-data/dashboard.data';
import { DashboardFilter, KpiMetric, Transaction } from '../../types/dashboard.types';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { ChartsPanelComponent } from '../../components/charts-panel/charts-panel.component';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [KpiCardComponent, FilterBarComponent, TransactionsTableComponent, ChartsPanelComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  private readonly i18n = inject(I18nService);

  readonly categories = CATEGORY_OPTIONS;
  readonly statuses = STATUS_OPTIONS;
  readonly transactions = TRANSACTIONS;

  filters: DashboardFilter = {
    category: 'All',
    status: 'All',
    search: '',
    dateFrom: '',
    dateTo: ''
  };

  filteredTransactions: Transaction[] = [];

  constructor() {
    this.applyFilters();
  }

  get locale(): string {
    return this.i18n.locale();
  }

  get text() {
    return this.i18n.text().dashboard;
  }

  get categoryLabelMap(): Record<string, string> {
    return this.i18n.text().categories;
  }

  get statusLabelMap() {
    return this.i18n.text().statuses;
  }

  get kpis(): KpiMetric[] {
    const data = this.filteredTransactions;
    const totalSales = data.reduce((sum, tx) => sum + tx.amount, 0);
    const activeUsers = new Set(data.map((tx) => tx.customer)).size;
    const completedCount = data.filter((tx) => tx.status === 'Completed').length;
    const conversionRate = data.length ? (completedCount / data.length) * 100 : 0;
    const revenueGrowth = this.calculateRevenueGrowth(data);
    const sign = (value: number) => (value >= 0 ? '+' : '-');

    return [
      {
        label: this.text.kpis.totalSales,
        value: this.currency(totalSales),
        trend: `${sign(revenueGrowth)}${Math.abs(revenueGrowth).toFixed(1)}% ${this.text.kpis.vsLastMonth}`,
        trendPositive: revenueGrowth >= 0
      },
      {
        label: this.text.kpis.activeUsers,
        value: `${activeUsers}`,
        trend: `${activeUsers >= 10 ? '+' : '-'} ${this.text.kpis.userMomentum}`,
        trendPositive: activeUsers >= 10
      },
      {
        label: this.text.kpis.conversionRate,
        value: `${conversionRate.toFixed(1)}%`,
        trend: `${conversionRate >= 70 ? '+' : '-'} ${this.text.kpis.salesEfficiency}`,
        trendPositive: conversionRate >= 70
      },
      {
        label: this.text.kpis.revenueGrowth,
        value: `${sign(revenueGrowth)}${Math.abs(revenueGrowth).toFixed(1)}%`,
        trend: this.text.kpis.monthOverMonth,
        trendPositive: revenueGrowth >= 0
      }
    ];
  }

  updateFilters(partial: Partial<DashboardFilter>): void {
    this.filters = { ...this.filters, ...partial };
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = {
      category: 'All',
      status: 'All',
      search: '',
      dateFrom: '',
      dateTo: ''
    };
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredTransactions = this.transactions.filter((tx) => {
      const searchMatch = !this.filters.search || tx.customer.toLowerCase().includes(this.filters.search.toLowerCase());
      const categoryMatch = this.filters.category === 'All' || tx.category === this.filters.category;
      const statusMatch = this.filters.status === 'All' || tx.status === this.filters.status;
      const dateFromMatch = !this.filters.dateFrom || tx.date >= this.filters.dateFrom;
      const dateToMatch = !this.filters.dateTo || tx.date <= this.filters.dateTo;

      return searchMatch && categoryMatch && statusMatch && dateFromMatch && dateToMatch;
    });
  }

  private currency(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  private calculateRevenueGrowth(data: Transaction[]): number {
    const monthly: Record<string, number> = {};

    data.forEach((tx) => {
      const key = tx.date.slice(0, 7);
      monthly[key] = (monthly[key] ?? 0) + tx.amount;
    });

    const months = Object.keys(monthly).sort();
    if (months.length < 2) {
      return 0;
    }

    const last = monthly[months[months.length - 1]];
    const previous = monthly[months[months.length - 2]];

    if (!previous) {
      return 0;
    }

    return ((last - previous) / previous) * 100;
  }
}

