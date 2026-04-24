import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Transaction } from '../../types/dashboard.types';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent {
  @Input({ required: true }) transactions: Transaction[] = [];
  @Input({ required: true }) labels!: {
    title: string;
    records: string;
    id: string;
    client: string;
    category: string;
    amount: string;
    status: string;
    date: string;
    empty: string;
  };
  @Input({ required: true }) statusLabels!: Record<Transaction['status'] | 'All', string>;
  @Input({ required: true }) categoryLabels!: Record<string, string>;
  @Input() locale = 'en-US';

  statusClass(status: Transaction['status']): string {
    return status.toLowerCase();
  }
}
