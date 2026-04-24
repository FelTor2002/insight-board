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

  statusClass(status: Transaction['status']): string {
    return status.toLowerCase();
  }
}
