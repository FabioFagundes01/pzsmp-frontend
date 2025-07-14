import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaService } from '../../core/services/mesa';
import { PedidoService } from '../../core/services/pedido';
import { ReservaService } from '../../core/services/reserva';
import { ProdutoService } from '../../core/services/produto';
import { Mesa } from '../../core/models/mesa.model';
import { Pedido } from '../../core/models/pedido.model';
import { Produto } from '../../core/models/produto.model';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas.html',
  styleUrls: ['./mesas.css']
})
export class Mesas implements OnInit {
  listaMesas: Mesa[] = [];
  
  // Variáveis do Modal
  mesaSelecionada: Mesa | null = null;
  modalView: 'novoPedido' | 'pedidos' | 'reserva' = 'novoPedido';
  
  // Dados para os diferentes views do modal
  pedidosDaMesa: Pedido[] = [];
  cardapioCompleto: Produto[] = [];
  cardapioFiltrado: Produto[] = [];
  filtroCardapioAtual: string = 'PIZZA_ESPECIAL';
  tiposDeProduto: string[] = [
    'PIZZA_ESPECIAL', 'PIZZA_TRADICIONAL', 'PIZZA_DOCE', 'PASTEL_DOCE',
    'LANCHES', 'PASTEL', 'SUCOS', 'DRINKS', 'SOBREMESA', 'BEBIDA'
  ];

  novoPedidoItens: { produto: Produto, quantidade: number }[] = [];
  totalNovoPedido: number = 0;
  novaReserva = { nomeReserva: '', numPessoas: null, observacoes: '' };

  constructor(
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private reservaService: ReservaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarMesas();
    this.carregarCardapio();
  }

  carregarMesas(): void {
    this.mesaService.getMesas().subscribe(data => this.listaMesas = data);
  }

  carregarCardapio(): void {
    this.produtoService.getProdutos().subscribe(data => {
      this.cardapioCompleto = data;
      this.filtrarCardapio(this.filtroCardapioAtual); // Aplica o filtro padrão
    });
  }

  abrirModal(mesa: Mesa): void {
    this.mesaSelecionada = mesa;
    this.modalView = 'novoPedido'; // Padrão é sempre abrir em "Novo Pedido"
    
    // Sempre busca os pedidos ativos para saber se a mesa está realmente ocupada
    this.pedidoService.getPedidosPorMesa(mesa.numero).subscribe(pedidos => {
      this.pedidosDaMesa = pedidos;
    });
  }

  fecharModal(): void {
    this.mesaSelecionada = null;
    this.pedidosDaMesa = [];
    this.novoPedidoItens = [];
    this.totalNovoPedido = 0;
    this.novaReserva = { nomeReserva: '', numPessoas: null, observacoes: '' };
  }
  
  // --- Lógica do Novo Pedido ---
  filtrarCardapio(tipo: string): void {
    this.filtroCardapioAtual = tipo;
    this.cardapioFiltrado = this.cardapioCompleto.filter(p => p.tipo === tipo);
  }

  adicionarAoPedido(produto: Produto): void {
    const itemExistente = this.novoPedidoItens.find(item => item.produto.id_produto === produto.id_produto);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      this.novoPedidoItens.push({ produto: produto, quantidade: 1 });
    }
    this.calcularTotalNovoPedido();
  }

  calcularTotalNovoPedido(): void {
    this.totalNovoPedido = this.novoPedidoItens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  }

  finalizarPedido(): void {
    if (this.novoPedidoItens.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }

    const itensParaApi = this.novoPedidoItens.map(item => ({
      idProduto: item.produto.id_produto,
      quantidade: item.quantidade
    }));

    // Se a mesa já tem pedidos, adicionamos itens ao primeiro pedido ativo
    if (this.pedidosDaMesa.length > 0) {
      const pedidoId = this.pedidosDaMesa[0].idPedido; // Pega o ID do primeiro pedido ativo
      this.pedidoService.adicionarItensAoPedido(pedidoId, itensParaApi).subscribe({
        next: () => {
          alert('Itens adicionados com sucesso!');
          this.carregarMesas();
          this.fecharModal();
        },
        error: (err) => {
          alert('Erro ao adicionar itens.');
          console.error(err);
        }
      });
    } else { // Se a mesa não tem pedidos, criamos um novo
      const pedidoParaApi = {
        idMesa: this.mesaSelecionada!.numero,
        idCliente: null,
        itens: itensParaApi
      };
      this.pedidoService.realizarPedido(pedidoParaApi).subscribe({
        next: () => {
          alert(`Novo pedido para a Mesa ${this.mesaSelecionada!.numero} criado com sucesso!`);
          this.carregarMesas();
          this.fecharModal();
        },
        error: (err) => {
          alert('Erro ao criar o pedido.');
          console.error(err);
        }
      });
    }
  }

  // --- Lógica da Reserva ---
  reservarMesa(): void {
    // ... (a lógica de reserva continua a mesma)
  }
}