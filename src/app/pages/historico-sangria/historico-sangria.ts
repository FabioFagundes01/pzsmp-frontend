import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaService } from '../../core/services/caixa';

@Component({
  selector: 'app-historico-sangria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-sangria.html',
  styleUrls: ['./historico-sangria.css']
})
export class HistoricoSangriaComponent implements OnInit {
  historico: any[] = []; // Array para armazenar os dados

  constructor(private caixaService: CaixaService) {}

  ngOnInit(): void {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.caixaService.getSangrias().subscribe({
      next: (data) => {
        this.historico = data;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico de sangrias', err);
        alert('Você não tem permissão para ver este relatório.');
      }
    });
  }
}