import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../core/services/cliente';
import { Cliente } from '../../core/models/cliente.model';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrls: ['./cadastro-cliente.css']
})
export class CadastroClienteComponent implements OnInit {

  // Array para armazenar a lista de clientes vinda da API
  listaClientes: Cliente[] = [];
  
  // Objeto para o formulário de um novo cliente, com valores padrão
  novoCliente = {
    nome: '',
    telefone: '',
    email: '',
    rua: '',
    bairro: '',
    numero: null,
    cidade: 'Rio Azul-PR',
    cep: '84560-000'
  };
  
  // Objeto para armazenar os dados do cliente que está sendo editado no modal
  clienteEmEdicao: any | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  /**
   * Busca a lista de todos os clientes usando o serviço.
   */
  carregarClientes(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.listaClientes = data;
    });
  }

  /**
   * Envia os dados do formulário para a API para cadastrar um novo cliente.
   */
  cadastrarCliente(): void {
    this.clienteService.cadastrarCliente(this.novoCliente).subscribe({
      next: (novoClienteCadastrado) => {
        alert(`Cliente "${novoClienteCadastrado.nome}" cadastrado com sucesso!`);
        this.carregarClientes(); // Atualiza a lista na tela
        this.limparFormulario(); // Limpa o formulário
      },
      error: (err) => {
        alert('Erro ao cadastrar cliente. Verifique se o e-mail já está em uso.');
        console.error(err);
      }
    });
  }

  /**
   * Limpa o formulário de cadastro, redefinindo para os valores padrão.
   */
  limparFormulario(): void {
    this.novoCliente = {
      nome: '', telefone: '', email: '',
      rua: '', bairro: '', numero: null, 
      cidade: 'Rio Azul-PR',
      cep: '84560-000'
    };
  }

  // --- MÉTODOS PARA GERENCIAR A EDIÇÃO E EXCLUSÃO ---

  /**
   * Prepara os dados do cliente selecionado e abre o modal de edição.
   * @param cliente O objeto do cliente a ser editado.
   */
  abrirModalEdicao(cliente: Cliente): void {
    // Cria uma cópia do cliente para edição, garantindo que os campos de endereço existam
    this.clienteEmEdicao = {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      // Se o cliente já tem um endereço, usa os dados dele. Senão, usa campos vazios/padrão.
      rua: cliente.endereco?.rua || '',
      bairro: cliente.endereco?.bairro || '',
      numero: cliente.endereco?.numero || null,
      cidade: cliente.endereco?.cidade || 'Rio Azul-PR',
      cep: cliente.endereco?.cep || '84560-000'
    };
  }

  /**
   * Fecha o modal de edição.
   */
  fecharModalEdicao(): void {
    this.clienteEmEdicao = null;
  }

  /**
   * Envia os dados atualizados do cliente para a API.
   */
  salvarEdicao(): void {
    if (!this.clienteEmEdicao) return;

    this.clienteService.atualizarCliente(this.clienteEmEdicao.id, this.clienteEmEdicao).subscribe({
      next: () => {
        alert('Cliente atualizado com sucesso!');
        this.carregarClientes();
        this.fecharModalEdicao();
      },
      error: (err) => {
        alert('Erro ao atualizar cliente.');
        console.error(err);
      }
    });
  }

  /**
   * Envia uma requisição para excluir um cliente.
   * @param id O ID do cliente a ser excluído.
   */
  excluirCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      this.clienteService.excluirCliente(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso.');
          this.carregarClientes();
        },
        error: (err) => {
          alert('Erro ao excluir cliente.');
          console.error(err);
        }
      });
    }
  }
}
