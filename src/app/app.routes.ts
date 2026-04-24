import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import { ReportsPageComponent } from './pages/reports-page/reports-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'analytics', component: AnalyticsPageComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: 'dashboard' }
];

