import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { Pedidos } from './pages/pedidos/pedidos';
import { Cardapio } from './pages/cardapio/cardapio';
import { Entregas } from './pages/entregas/entregas';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Mesas } from './pages/mesas/mesas';
import { Balcao } from './pages/balcao/balcao';

export const routes: Routes = [
  // Rotas de autenticação (públicas)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },

  // Rotas da aplicação principal (protegidas)
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard], // <-- Nosso guarda protegendo todo este grupo de rotas
    children: [
      { path: 'pedidos', component: Pedidos },
      { path: 'cardapio', component: Cardapio },
      { path: 'entregas', component: Entregas },
      { path: 'funcionarios', component: Funcionarios },
      { path: 'mesas', component: Mesas },
      { path: 'balcao', component: Balcao },
      // Rota padrão dentro da área logada
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' }
    ]
  },

  // Rota padrão geral, redireciona para o login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  // Rota "coringa" para páginas não encontradas
  { path: '**', redirectTo: 'auth/login' }
];