import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://localhost:8081/api/mesas';

  constructor(private http: HttpClient) { }

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }
}