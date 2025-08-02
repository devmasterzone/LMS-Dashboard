import { Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';

export const routes: Routes = [
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
];
