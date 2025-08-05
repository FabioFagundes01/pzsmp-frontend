import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../core/services/pedido';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.css']
})
export class RelatoriosComponent implements OnInit {
  relatorios: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.getRelatorios().subscribe(data => {
      this.relatorios = data;
    });
  }
}
