import { Component, inject } from '@angular/core';
import { TRANSACTIONS } from '../../mock-data/dashboard.data';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css'
})
export class AnalyticsPageComponent {
  private readonly i18n = inject(I18nService);
  readonly transactions = TRANSACTIONS;

  get text() {
    return this.i18n.text().analytics;
  }

  get locale(): string {
    return this.i18n.locale();
  }

  get topCategory(): string {
    const totals = this.sumByCategory();
    const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    return winner ? this.i18n.categoryLabel(winner[0]) : '-';
  }

  get averageTicket(): string {
    const total = this.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const average = this.transactions.length ? total / this.transactions.length : 0;
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(average);
  }

  get completionRate(): string {
    const completed = this.transactions.filter((tx) => tx.status === 'Completed').length;
    const rate = this.transactions.length ? (completed / this.transactions.length) * 100 : 0;
    return `${rate.toFixed(1)}%`;
  }

  get categoryBreakdown(): Array<{ category: string; amount: number; share: number }> {
    const totals = this.sumByCategory();
    const grandTotal = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return Object.entries(totals)
      .map(([category, amount]) => ({
        category: this.i18n.categoryLabel(category),
        amount,
        share: grandTotal ? (amount / grandTotal) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  get channelBreakdown(): Array<{ channel: string; count: number }> {
    const map = new Map<string, number>();
    this.transactions.forEach((tx) => {
      map.set(tx.channel, (map.get(tx.channel) ?? 0) + 1);
    });

    return [...map.entries()]
      .map(([channel, count]) => ({ channel, count }))
      .sort((a, b) => b.count - a.count);
  }

  private sumByCategory(): Record<string, number> {
    const map = new Map<string, number>();
    this.transactions.forEach((tx) => {
      map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
    });
    return Object.fromEntries(map.entries());
  }
}

