import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full',
  },
  {
    path: 'fondos',
    loadChildren: () => import('./features/funds/funds.routes').then((m) => m.FUNDS_ROUTES),
  },
  {
    path: 'portafolio',
    loadChildren: () =>
      import('./features/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
  },
  {
    path: 'transacciones',
    loadChildren: () =>
      import('./features/transactions/transactions.routes').then((m) => m.TRANSACTIONS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'fondos',
  },
];
