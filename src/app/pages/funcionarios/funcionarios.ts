import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../core/services/funcionario';
import { Funcionario } from '../../core/models/funcionario.model';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funcionarios.html',
  styleUrls: ['./funcionarios.css']
})
export class Funcionarios implements OnInit {

  // Variável para controlar a visualização: 'lista' ou 'cadastro'
  modo: 'lista' | 'cadastro' = 'lista';

  listaFuncionarios: Funcionario[] = [];
  novoFuncionario = {
    nome: '',
    telefone: '',
    cargo: '',
    login: '',
    senha: ''
  };

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(data => {
      this.listaFuncionarios = data;
    });
  }

  cadastrarFuncionario(): void {
    this.funcionarioService.cadastrarFuncionario(this.novoFuncionario).subscribe({
      next: (novoFuncionarioCadastrado) => {
        alert(`Funcionário "${novoFuncionarioCadastrado.nome}" cadastrado com sucesso!`);
        this.carregarFuncionarios(); // Atualiza a lista
        this.voltarParaLista(); // Volta para a tela de listagem
      },
      error: (err) => {
        alert('Erro ao cadastrar funcionário.');
        console.error(err);
      }
    });
  }

  // Método para mudar para a tela de cadastro
  irParaModoCadastro(): void {
    this.modo = 'cadastro';
  }

  // Método para voltar para a tela de listagem
  voltarParaLista(): void {
    // Limpa o formulário antes de voltar
    this.novoFuncionario = { nome: '', telefone: '', cargo: '', login: '', senha: '' };
    this.modo = 'lista';
  }
}
