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

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data: Pedido[]) => {
        this.pedidos = data;
        console.log('Pedidos carregados:', this.pedidos);
      },
      error: (err: any) => {
        console.error('Erro ao carregar pedidos', err);
      }
    });
  }

  mudarStatus(pedidoId: number, novoStatus: string): void {
    this.pedidoService.atualizarStatus(pedidoId, novoStatus).subscribe({
        next: (pedidoAtualizado: Pedido) => {
            const index = this.pedidos.findIndex(p => p.idPedido === pedidoId);
            if (index !== -1) {
                this.pedidos[index] = pedidoAtualizado;
            }
        },
        error: (err: any) => {
            alert('Erro ao mudar o status do pedido.');
            console.error(err);
        }
    });
  }

  fecharPedido(pedidoId: number): void {
    this.pedidoService.fecharPedido(pedidoId).subscribe({
        next: () => {
            console.log(`Pedido ${pedidoId} fechado com sucesso.`);
            this.carregarPedidos(); // Recarrega a lista para refletir as mudanças
        },
        error: (err: any) => {
            alert('Erro ao fechar o pedido.');
            console.error(err);
        }
    });
  }
}
