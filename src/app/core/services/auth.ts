import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base da sua API. Certifique-se de que seu backend esteja rodando.
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  /**
   * Envia as credenciais para a API para tentar fazer o login.
   * @param credentials Objeto com login e senha.
   * @returns Um Observable com a resposta da API (que contém o token).
   */
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Se a resposta contiver um token, salva no localStorage.
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  /**
   * Salva o token JWT no localStorage do navegador.
   * @param token O token a ser salvo.
   */
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Recupera o token do localStorage.
   * @returns O token salvo ou null se não existir.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Remove o token do localStorage (para fazer logout).
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }
}