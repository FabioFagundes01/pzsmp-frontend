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

  pedidos: Pedido[] = []; // Array para armazenar os pedidos

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  mudarStatus(pedidoId: number, novoStatus: string): void {
    this.pedidoService.atualizarStatus(pedidoId, novoStatus).subscribe({
        next: (pedidoAtualizado) => {
            // Para uma experiência de usuário melhor, atualizamos o pedido na lista local
            // sem precisar recarregar a página inteira.
            const index = this.pedidos.findIndex(p => p.idPedido === pedidoId);
            if (index !== -1) {
                this.pedidos[index] = pedidoAtualizado;
            }
            console.log(`Status do pedido ${pedidoId} alterado para ${novoStatus}`);
        },
        error: (err) => console.error(`Erro ao mudar status do pedido ${pedidoId}`, err)
    });
}

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log('Pedidos carregados:', this.pedidos);
      },
      error: (err) => console.error('Erro ao carregar pedidos', err)
    });
  }
}