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
   * @param numeroMesa O número da mesa.
   */
  getPedidosPorMesa(numeroMesa: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/mesa/${numeroMesa}`);
  }

  /**
   * Envia os dados de um novo pedido para a API.
   * @param pedidoData Objeto com os dados do pedido (idMesa, itens, etc.).
   */
  realizarPedido(pedidoData: any): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedidoData);
  }

  /**
   * Envia uma requisição para atualizar o status de um pedido.
   * @param id O ID do pedido a ser atualizado.
   * @param novoStatus O novo status para o pedido.
   */
  atualizarStatus(id: number, novoStatus: string): Observable<Pedido> {
    const requestBody = { novoStatus: novoStatus };
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/status`, requestBody);
  }

  /**
   * Envia uma lista de novos itens para serem adicionados a um pedido existente.
   * @param pedidoId O ID do pedido a ser modificado.
   * @param itens A lista de novos itens a serem adicionados.
   */
  adicionarItensAoPedido(pedidoId: number, itens: { idProduto: number, quantidade: number }[]): Observable<Pedido> {
    const requestBody = { itens: itens };
    return this.http.post<Pedido>(`${this.apiUrl}/${pedidoId}/itens`, requestBody);
  }
}