import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export type EstadoCita = 'PROGRAMADA' | 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA';
export type TipoCita = 'OBSERVACION' | 'EVALUACION';

export interface Cita {
  id_cita: number;
  fecha: string;
  hora: string;
  nino_nombre: string;
  diagnostico: string;
  tipo_cita: TipoCita;
  motivo: string;
  servicio: string;
  notas?: string;
  lugar?: string;
  estado: EstadoCita;
  id_personal?: number;
}

export interface CrearActualizarCitaDTO {
  fecha: string;
  hora: string;
  nino_nombre: string;
  diagnostico: string;
  tipo_cita: TipoCita;
  motivo: string;
  servicio: string;
  notas?: string;
  lugar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private baseUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

  getCita(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/${id}`);
  }

  crearCita(payload: CrearActualizarCitaDTO): Observable<Cita> {
    return this.http.post<Cita>(this.baseUrl, payload);
  }

  actualizarCita(id: number, payload: CrearActualizarCitaDTO): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseUrl}/${id}`, payload);
  }

  cancelarCita(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/cancelar`, {});
  }
}
