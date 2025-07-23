    import { Component } from '@angular/core';
    import { Router, RouterModule } from '@angular/router';
    import { AuthService } from '../../core/services/auth';
    import { PedidoService } from '../../core/services/pedido'; // <-- IMPORTE O SERVIÇO

    @Component({
      selector: 'app-main-layout',
      standalone: true,
      imports: [RouterModule],
      templateUrl: './main-layout.html',
      styleUrls: ['./main-layout.css']
    })
    export class MainLayoutComponent {

      // INJETE O PedidoService AQUI
      constructor(
        private authService: AuthService, 
        private router: Router,
        private pedidoService: PedidoService
      ) {}

      logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
      }

      // NOVO MÉTODO PARA FECHAR O CAIXA
      fecharCaixa(): void {
        const confirmacao = confirm(
          'ATENÇÃO!\n\nEsta ação irá apagar TODOS os pedidos em andamento e liberar todas as mesas.\n\nTem certeza que deseja fechar o caixa?'
        );

        if (confirmacao) {
          this.pedidoService.fecharCaixa().subscribe({
            next: () => {
              alert('Caixa fechado com sucesso! Todos os pedidos foram limpos.');
              // Recarrega a aplicação para refletir as mudanças em todas as telas
              window.location.reload();
            },
            error: (err) => {
              alert('Erro ao fechar o caixa. Verifique se você tem permissão de Administrador.');
              console.error(err);
            }
          });
        }
      }
    }
    