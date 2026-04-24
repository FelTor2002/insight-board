import { Injectable, computed, signal } from '@angular/core';
import { TransactionStatus } from '../types/dashboard.types';

export type Language = 'en' | 'es';

type StatusKey = TransactionStatus | 'All';

interface DashboardText {
  heroTitle: string;
  heroDescription: string;
  filtersTitle: string;
  filterLabels: {
    category: string;
    status: string;
    searchCustomer: string;
    searchPlaceholder: string;
    dateFrom: string;
    dateTo: string;
    clear: string;
  };
  table: {
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
  charts: {
    monthlySales: string;
    revenueByCategory: string;
    userChannelDistribution: string;
    salesDataset: string;
    categoryRevenueDataset: string;
  };
  kpis: {
    totalSales: string;
    activeUsers: string;
    conversionRate: string;
    revenueGrowth: string;
    vsLastMonth: string;
    userMomentum: string;
    salesEfficiency: string;
    monthOverMonth: string;
  };
}

interface AnalyticsText {
  title: string;
  description: string;
  topCategory: string;
  avgTicket: string;
  completionRate: string;
  categoryPerformance: string;
  channelPerformance: string;
  transactions: string;
}

interface ReportsText {
  title: string;
  description: string;
  monthlySummary: string;
  month: string;
  revenue: string;
  completed: string;
  pending: string;
  cancelled: string;
  exportCsv: string;
}

interface SettingsText {
  title: string;
  description: string;
  languagePreference: string;
  preview: string;
  language: string;
}

interface AppText {
  role: string;
  nav: {
    dashboard: string;
    analytics: string;
    reports: string;
    settings: string;
  };
  dashboard: DashboardText;
  analytics: AnalyticsText;
  reports: ReportsText;
  settings: SettingsText;
  categories: Record<string, string>;
  statuses: Record<StatusKey, string>;
}

const TRANSLATIONS: Record<Language, AppText> = {
  en: {
    role: 'Training · Junior Developer',
    nav: {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      reports: 'Reports',
      settings: 'Settings'
    },
    dashboard: {
      heroTitle: 'Analytics Overview',
      heroDescription: 'Professional dashboard focused on frontend, data analytics and UX.',
      filtersTitle: 'Filters',
      filterLabels: {
        category: 'Category',
        status: 'Status',
        searchCustomer: 'Search customer',
        searchPlaceholder: 'Type customer name',
        dateFrom: 'Date from',
        dateTo: 'Date to',
        clear: 'Clear'
      },
      table: {
        title: 'Recent Transactions',
        records: 'records',
        id: 'ID',
        client: 'Client',
        category: 'Category',
        amount: 'Amount',
        status: 'Status',
        date: 'Date',
        empty: 'No transactions match your filters.'
      },
      charts: {
        monthlySales: 'Monthly Sales',
        revenueByCategory: 'Revenue by Category',
        userChannelDistribution: 'User Channel Distribution',
        salesDataset: 'Sales',
        categoryRevenueDataset: 'Category Revenue'
      },
      kpis: {
        totalSales: 'Total Sales',
        activeUsers: 'Active Users',
        conversionRate: 'Conversion Rate',
        revenueGrowth: 'Revenue Growth',
        vsLastMonth: 'vs last month',
        userMomentum: 'user momentum',
        salesEfficiency: 'sales efficiency',
        monthOverMonth: 'month-over-month trend'
      }
    },
    analytics: {
      title: 'Analytics Insights',
      description: 'Focused performance insights to support data-driven decisions.',
      topCategory: 'Top Category',
      avgTicket: 'Average Ticket',
      completionRate: 'Completion Rate',
      categoryPerformance: 'Category Performance',
      channelPerformance: 'Channel Performance',
      transactions: 'transactions'
    },
    reports: {
      title: 'Reports Center',
      description: 'Monthly summaries and export-ready data for stakeholders.',
      monthlySummary: 'Monthly Summary',
      month: 'Month',
      revenue: 'Revenue',
      completed: 'Completed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      exportCsv: 'Export CSV'
    },
    settings: {
      title: 'Settings',
      description: 'Manage language and personalization options for the dashboard.',
      languagePreference: 'Language Preference',
      preview: 'Formatting Preview',
      language: 'Language'
    },
    categories: {
      All: 'All',
      Software: 'Software',
      Marketing: 'Marketing',
      Hardware: 'Hardware',
      Consulting: 'Consulting',
      Support: 'Support'
    },
    statuses: {
      All: 'All',
      Completed: 'Completed',
      Pending: 'Pending',
      Cancelled: 'Cancelled'
    }
  },
  es: {
    role: 'Training · Junior Developer',
    nav: {
      dashboard: 'Panel',
      analytics: 'Analítica',
      reports: 'Reportes',
      settings: 'Ajustes'
    },
    dashboard: {
      heroTitle: 'Resumen de Analítica',
      heroDescription: 'Dashboard profesional enfocado en frontend, analítica de datos y UX.',
      filtersTitle: 'Filtros',
      filterLabels: {
        category: 'Categoría',
        status: 'Estado',
        searchCustomer: 'Buscar cliente',
        searchPlaceholder: 'Escribe el nombre del cliente',
        dateFrom: 'Fecha desde',
        dateTo: 'Fecha hasta',
        clear: 'Limpiar'
      },
      table: {
        title: 'Transacciones Recientes',
        records: 'registros',
        id: 'ID',
        client: 'Cliente',
        category: 'Categoría',
        amount: 'Monto',
        status: 'Estado',
        date: 'Fecha',
        empty: 'No hay transacciones para los filtros aplicados.'
      },
      charts: {
        monthlySales: 'Ventas Mensuales',
        revenueByCategory: 'Ingresos por Categoría',
        userChannelDistribution: 'Distribución de Usuarios por Canal',
        salesDataset: 'Ventas',
        categoryRevenueDataset: 'Ingresos por Categoría'
      },
      kpis: {
        totalSales: 'Ventas Totales',
        activeUsers: 'Usuarios Activos',
        conversionRate: 'Tasa de Conversión',
        revenueGrowth: 'Crecimiento de Ingresos',
        vsLastMonth: 'vs mes anterior',
        userMomentum: 'impulso de usuarios',
        salesEfficiency: 'eficiencia comercial',
        monthOverMonth: 'tendencia mes a mes'
      }
    },
    analytics: {
      title: 'Insights de Analítica',
      description: 'Métricas clave para tomar decisiones basadas en datos.',
      topCategory: 'Categoría Top',
      avgTicket: 'Ticket Promedio',
      completionRate: 'Tasa de Cierre',
      categoryPerformance: 'Rendimiento por Categoría',
      channelPerformance: 'Rendimiento por Canal',
      transactions: 'transacciones'
    },
    reports: {
      title: 'Centro de Reportes',
      description: 'Resumen mensual y exportación de datos para compartir.',
      monthlySummary: 'Resumen Mensual',
      month: 'Mes',
      revenue: 'Ingresos',
      completed: 'Completadas',
      pending: 'Pendientes',
      cancelled: 'Canceladas',
      exportCsv: 'Exportar CSV'
    },
    settings: {
      title: 'Ajustes',
      description: 'Gestiona idioma y opciones de personalización del dashboard.',
      languagePreference: 'Preferencia de Idioma',
      preview: 'Vista Previa de Formato',
      language: 'Idioma'
    },
    categories: {
      All: 'Todas',
      Software: 'Software',
      Marketing: 'Marketing',
      Hardware: 'Hardware',
      Consulting: 'Consultoría',
      Support: 'Soporte'
    },
    statuses: {
      All: 'Todos',
      Completed: 'Completado',
      Pending: 'Pendiente',
      Cancelled: 'Cancelado'
    }
  }
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'insight-board.language';
  readonly language = signal<Language>('en');
  readonly locale = computed(() => (this.language() === 'es' ? 'es-ES' : 'en-US'));
  readonly text = computed(() => TRANSLATIONS[this.language()]);

  constructor() {
    const language = this.readLanguage();
    if (language) {
      this.language.set(language);
      return;
    }

    if (typeof navigator !== 'undefined') {
      const browserLanguage = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
      this.language.set(browserLanguage);
    }
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, language);
    }
  }

  statusLabel(status: StatusKey): string {
    return this.text().statuses[status];
  }

  categoryLabel(category: string): string {
    return this.text().categories[category] ?? category;
  }

  private readLanguage(): Language | null {
    try {
      if (typeof localStorage === 'undefined') {
        return null;
      }

      const value = localStorage.getItem(this.storageKey);
      return value === 'es' || value === 'en' ? value : null;
    } catch {
      return null;
    }
  }
}

