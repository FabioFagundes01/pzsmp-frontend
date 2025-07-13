import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // URL da sua API de produtos. Lembre-se que mudamos a porta.
  private apiUrl = 'http://localhost:8081/api/produtos';

  constructor(private http: HttpClient) { }

  /**
   * Método que busca todos os produtos na API (para a tela do Cardápio)
   */
  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Método que envia os dados de um novo produto para a API
   */
  cadastrarProduto(formData: FormData): Observable<any> {
    // Não definimos o 'Content-Type'. O navegador faz isso automaticamente para FormData.
    return this.http.post<any>(this.apiUrl, formData);
}
}