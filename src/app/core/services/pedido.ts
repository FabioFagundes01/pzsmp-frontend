import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model'; // Importa nosso modelo

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8081/api/pedidos'; // Lembre-se que mudamos a porta

  constructor(private http: HttpClient) { }
    // Método que atualiza o status de um pedido específico
atualizarStatus(id: number, novoStatus: string): Observable<Pedido> {
    const requestBody = { novoStatus: novoStatus };
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/status`, requestBody);
}
  // Método que busca todos os pedidos na API
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
}