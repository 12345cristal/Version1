import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CatalogosService {

  private api = `${environment.apiUrl}/catalogos`;

  constructor(private http: HttpClient) {}

  getTiposSangre(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/tipos-sangre`);
  }

  getDiagnosticos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/diagnosticos`);
  }

  getRelaciones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/relaciones`);
  }

  getGeneros(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/generos`);
  }

  getNivelesDesarrollo(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/niveles-desarrollo`);
  }
}
