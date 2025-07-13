// Em src/app/core/models/pedido.model.ts
export interface ItemPedido {
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Cliente {
  id: number;
  nome: string;
}

export interface Pedido {
  idPedido: number;
  data: string; // ou Date
  status: string;
  total: number;
  cliente: Cliente;
  itens: ItemPedido[];
}