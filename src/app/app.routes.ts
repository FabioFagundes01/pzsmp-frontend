import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  // Rota padrão da aplicação
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];