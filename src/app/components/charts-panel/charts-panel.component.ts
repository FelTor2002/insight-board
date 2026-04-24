import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import Chart from 'chart.js/auto';
import { Transaction } from '../../types/dashboard.types';

@Component({
  selector: 'app-charts-panel',
  standalone: true,
  templateUrl: './charts-panel.component.html',
  styleUrl: './charts-panel.component.css'
})
export class ChartsPanelComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) transactions: Transaction[] = [];
  @Input({ required: true }) labels!: {
    monthlySales: string;
    revenueByCategory: string;
    userChannelDistribution: string;
    salesDataset: string;
    categoryRevenueDataset: string;
  };
  @Input() locale = 'en-US';

  @ViewChild('monthlySalesCanvas') monthlySalesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categorySalesCanvas') categorySalesCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('channelDistributionCanvas') channelDistributionCanvas!: ElementRef<HTMLCanvasElement>;

  private lineChart?: Chart;
  private barChart?: Chart;
  private doughnutChart?: Chart;
  private viewReady = false;
  private lastDataSignature = '';

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.createCharts();
    this.refreshCharts();
  }

  ngOnChanges(_: SimpleChanges): void {
    if (this.viewReady) {
      this.refreshCharts();
    }
  }

  ngOnDestroy(): void {
    this.lineChart?.destroy();
    this.barChart?.destroy();
    this.doughnutChart?.destroy();
  }

  private createCharts(): void {
    const lineCtx = this.monthlySalesCanvas.nativeElement.getContext('2d');
    const barCtx = this.categorySalesCanvas.nativeElement.getContext('2d');
    const doughnutCtx = this.channelDistributionCanvas.nativeElement.getContext('2d');

    if (!lineCtx || !barCtx || !doughnutCtx) {
      return;
    }

    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            label: this.labels.salesDataset,
            borderColor: '#40d6ff',
            backgroundColor: 'rgba(64, 214, 255, 0.15)',
            tension: 0.35,
            fill: true
          }
        ]
      },
      options: this.baseOptions()
    });

    this.barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{ data: [], label: this.labels.categoryRevenueDataset, borderRadius: 8, backgroundColor: '#95f985' }]
      },
      options: this.baseOptions()
    });

    this.doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#40d6ff', '#95f985', '#ffd781', '#b39cff', '#ff8f98']
          }
        ]
      },
      options: {
        plugins: { legend: { labels: { color: '#d3d8e2', boxWidth: 14 } } }
      }
    });
  }

  private refreshCharts(): void {
    const currentSignature = JSON.stringify({
      locale: this.locale,
      labels: this.labels,
      data: this.transactions.map((tx) => [tx.id, tx.amount, tx.category, tx.channel, tx.date, tx.status, tx.customer])
    });
    if (currentSignature === this.lastDataSignature) {
      return;
    }
    this.lastDataSignature = currentSignature;

    const monthly = this.sumByMonth(this.transactions);
    const byCategory = this.sumByKey(this.transactions, 'category');
    const byChannel = this.sumByKey(this.transactions, 'channel');

    if (this.lineChart) {
      this.lineChart.data.labels = Object.keys(monthly);
      this.lineChart.data.datasets[0].data = Object.values(monthly);
      this.lineChart.data.datasets[0].label = this.labels.salesDataset;
      this.lineChart.update('none');
    }

    if (this.barChart) {
      this.barChart.data.labels = Object.keys(byCategory);
      this.barChart.data.datasets[0].data = Object.values(byCategory);
      this.barChart.data.datasets[0].label = this.labels.categoryRevenueDataset;
      this.barChart.update('none');
    }

    if (this.doughnutChart) {
      this.doughnutChart.data.labels = Object.keys(byChannel);
      this.doughnutChart.data.datasets[0].data = Object.values(byChannel);
      this.doughnutChart.update('none');
    }
  }

  private sumByMonth(transactions: Transaction[]): Record<string, number> {
    const totals = new Map<string, number>();

    transactions.forEach((item) => {
      const monthKey = item.date.slice(0, 7);
      totals.set(monthKey, (totals.get(monthKey) ?? 0) + item.amount);
    });

    const ordered = [...totals.entries()].sort(([a], [b]) => a.localeCompare(b));
    const formatted = ordered.map(([monthKey, total]) => {
      const monthLabel = new Date(`${monthKey}-01`).toLocaleString(this.locale, { month: 'short' });
      return [monthLabel, total] as const;
    });

    return Object.fromEntries(formatted);
  }

  private sumByKey(transactions: Transaction[], key: 'category' | 'channel'): Record<string, number> {
    const totals = new Map<string, number>();

    transactions.forEach((item) => {
      totals.set(item[key], (totals.get(item[key]) ?? 0) + item.amount);
    });

    return Object.fromEntries(totals.entries());
  }

  private baseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 120,
      plugins: {
        legend: { labels: { color: '#d3d8e2' } }
      },
      scales: {
        x: {
          ticks: { color: '#8f9ab0' },
          grid: { color: 'rgba(143, 154, 176, 0.18)' }
        },
        y: {
          ticks: { color: '#8f9ab0' },
          grid: { color: 'rgba(143, 154, 176, 0.18)' }
        }
      }
    };
  }
}
