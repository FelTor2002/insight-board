import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardFilter, TransactionStatus } from '../../types/dashboard.types';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
  @Input({ required: true }) filter!: DashboardFilter;
  @Input({ required: true }) categories!: string[];
  @Input({ required: true }) statuses!: Array<TransactionStatus | 'All'>;

  @Output() filterChange = new EventEmitter<Partial<DashboardFilter>>();
  @Output() clearFilters = new EventEmitter<void>();

  update<K extends keyof DashboardFilter>(key: K, value: DashboardFilter[K]): void {
    this.filterChange.emit({ [key]: value });
  }
}