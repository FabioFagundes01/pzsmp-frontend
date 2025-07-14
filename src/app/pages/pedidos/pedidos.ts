import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../core/services/pedido';
import { Pedido } from '../../core/models/pedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class Pedidos implements OnInit {

  // Array para armazenar a lista de pedidos que vem da API
  pedidos: Pedido[] = [];

  // Injeta o PedidoService no construtor para que possamos usá-lo
  constructor(private pedidoService: PedidoService) {}

  // Este método é chamado automaticamente quando o componente é carregado
  ngOnInit(): void {
    this.carregarPedidos();
  }

  /**
   * Busca a lista de todos os pedidos usando o serviço.
   */
  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data: Pedido[]) => { // Define o tipo de 'data' como um array de Pedido
        this.pedidos = data;
        console.log('Pedidos carregados:', this.pedidos);
      },
      error: (err: any) => { // Define o tipo de 'err' como 'any' para capturar qualquer erro
        console.error('Erro ao carregar pedidos', err);
      }
    });
  }

  /**
   * Altera o status de um pedido específico.
   * @param pedidoId O ID do pedido a ser alterado.
   * @param novoStatus O novo status para o pedido.
   */
  mudarStatus(pedidoId: number, novoStatus: string): void {
    this.pedidoService.atualizarStatus(pedidoId, novoStatus).subscribe({
        next: (pedidoAtualizado: Pedido) => { // Define o tipo da resposta como Pedido
            // Encontra o pedido na lista local e o atualiza com os novos dados
            const index = this.pedidos.findIndex(p => p.idPedido === pedidoId);
            if (index !== -1) {
                this.pedidos[index] = pedidoAtualizado;
            }
            console.log(`Status do pedido ${pedidoId} alterado para ${novoStatus}`);
        },
        error: (err: any) => { // Define o tipo de 'err' como 'any'
            console.error(`Erro ao mudar status do pedido ${pedidoId}`, err);
            alert('Erro ao mudar o status do pedido.');
        }
    });
  }
}