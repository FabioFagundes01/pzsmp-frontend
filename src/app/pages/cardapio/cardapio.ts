import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../core/services/produto';
import { Produto } from '../../core/models/produto.model'; // Vamos criar este modelo

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.html',
  styleUrls: ['./cardapio.css']
})
export class Cardapio implements OnInit {

  todosOsProdutos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  filtroAtual: string = 'PIZZA_ESPECIAL'; // <-- Define o filtro padrão
  tiposDeProduto: string[] = [
    'PIZZA_ESPECIAL',
    'PIZZA_TRADICIONAL',
    'PIZZA_DOCE',
    'PASTEL_DOCE',
    'LANCHES',
    'PASTEL',
    'SUCOS',
    'DRINKS',
    'SOBREMESA',
    'BEBIDA'
  ];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarTodosOsProdutos();
  }

  carregarTodosOsProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.todosOsProdutos = data;
        // Assim que os produtos são carregados, aplica o filtro padrão
        this.filtrarProdutos(this.filtroAtual);
      },
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  filtrarProdutos(tipo: string): void {
    this.filtroAtual = tipo;
    this.produtosFiltrados = this.todosOsProdutos.filter(produto => produto.tipo === tipo);
  }

  // Função para formatar o nome do filtro para exibição
  formatarNomeFiltro(tipo: string): string {
    return tipo.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}