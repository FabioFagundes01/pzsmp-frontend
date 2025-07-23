import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8081/api/pedidos';

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os pedidos na API.
   */
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /**
   * Busca todos os pedidos ativos de uma mesa específica.
   */
  getPedidosPorMesa(numeroMesa: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mesa/${numeroMesa}`);
  }

  /**
   * Envia os dados de um novo pedido para a API.
   */
  realizarPedido(pedidoData: any): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedidoData);
  }

  /**
   * Envia uma requisição para atualizar o status de um pedido.
   */
  atualizarStatus(id: number, novoStatus: string): Observable<Pedido> {
    const requestBody = { novoStatus: novoStatus };
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/status`, requestBody);
  }

  /**
   * Envia uma lista de novos itens para serem adicionados a um pedido existente.
   */
  adicionarItensAoPedido(pedidoId: number, itens: { idProduto: number, quantidade: number }[]): Observable<Pedido> {
    const requestBody = { itens: itens };
    return this.http.post<Pedido>(`${this.apiUrl}/${pedidoId}/itens`, requestBody);
  }

  /**
   * Envia uma requisição para fechar um pedido de mesa.
   */
  fecharPedido(pedidoId: number): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${pedidoId}/fechar`, {});
  }

  /**
   * Envia uma requisição para fechar o caixa (excluir todos os pedidos).
   */
  fecharCaixa(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fechar-caixa`);
  }
}
