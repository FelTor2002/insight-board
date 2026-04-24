import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TRANSACTIONS } from '../../mock-data/dashboard.data';
import { I18nService } from '../../core/i18n.service';

interface MonthlyReport {
  monthKey: string;
  monthLabel: string;
  revenue: number;
  completed: number;
  pending: number;
  cancelled: number;
}

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css'
})
export class ReportsPageComponent {
  private readonly i18n = inject(I18nService);
  readonly transactions = TRANSACTIONS;

  get text() {
    return this.i18n.text().reports;
  }

  get locale(): string {
    return this.i18n.locale();
  }

  get monthlyReports(): MonthlyReport[] {
    const monthly = new Map<string, MonthlyReport>();

    this.transactions.forEach((tx) => {
      const monthKey = tx.date.slice(0, 7);
      const monthLabel = new Date(`${monthKey}-01`).toLocaleString(this.locale, {
        month: 'short',
        year: 'numeric'
      });

      const current = monthly.get(monthKey) ?? {
        monthKey,
        monthLabel,
        revenue: 0,
        completed: 0,
        pending: 0,
        cancelled: 0
      };

      current.revenue += tx.amount;
      if (tx.status === 'Completed') current.completed += 1;
      if (tx.status === 'Pending') current.pending += 1;
      if (tx.status === 'Cancelled') current.cancelled += 1;

      monthly.set(monthKey, current);
    });

    return [...monthly.values()].sort((a, b) => a.monthKey.localeCompare(b.monthKey));
  }

  async exportXlsx(): Promise<void> {
    const XLSX = await import('xlsx');
    const rows = [
      [this.text.month, this.text.revenue, this.text.completed, this.text.pending, this.text.cancelled],
      ...this.monthlyReports.map((report) => [
        report.monthLabel,
        report.revenue,
        report.completed,
        report.pending,
        report.cancelled
      ])
    ];

    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    sheet['!cols'] = [{ wch: 16 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(workbook, sheet, this.text.monthlySummary);

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'insight-board-reports.xlsx';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
