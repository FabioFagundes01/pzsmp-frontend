import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se existir um token, o usuário pode acessar a rota
  if (authService.getToken()) {
    return true;
  }

  // Se não existir, redireciona para a página de login
  router.navigate(['/auth/login']);
  return false;
};