import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nino } from '../interfaces/nuevo_beneficiario/nino.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NinosService {

  private api = `${environment.apiUrl}/ninos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Nino[]> {
    return this.http.get<Nino[]>(this.api);
  }

  crear(nino: Nino): Observable<any> {
    return this.http.post(this.api, nino);
  }

  actualizar(id: number, nino: Nino): Observable<any> {
    return this.http.put(`${this.api}/${id}`, nino);
  }

  cambiarEstado(id: number, estado: 'ACTIVO' | 'INACTIVO'): Observable<any> {
    return this.http.patch(`${this.api}/${id}/estado`, { estado });
  }

  obtener(id: number): Observable<Nino> {
    return this.http.get<Nino>(`${this.api}/${id}`);
  }
}
