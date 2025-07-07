import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true, // Indica que é um componente standalone
  imports: [FormsModule, CommonModule] // Importa módulos necessários
})
export class LoginComponent {
  // Objeto para armazenar os dados do formulário
  credentials = {
    login: '',
    senha: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Chamado quando o formulário é enviado.
   */
  onLogin(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Redireciona para uma página principal após o login (ex: /dashboard)
        // Vamos criar essa rota depois.
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Falha no login', err);
        this.errorMessage = 'Login ou senha inválidos. Tente novamente.';
      }
    });
  }
}