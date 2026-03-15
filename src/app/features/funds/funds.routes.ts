import { Routes } from '@angular/router';

export const FUNDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/fund-list/fund-list.component').then((m) => m.FundListComponent),
  },
];
