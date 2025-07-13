import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8081/api/funcionarios';

  constructor(private http: HttpClient) { }

  // Busca a lista de todos os funcionários
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  // Cadastra um novo funcionário
  cadastrarFuncionario(funcionarioData: any): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionarioData);
  }
}