import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Personal } from '../../interfaces/personal/personal.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private api = `${environment.apiUrl}/personal`;

  constructor(private http: HttpClient) {}

  // =========================================================
  // 1. Obtener todo el personal
  // =========================================================
  getPersonal() {
    return this.http.get<Personal[]>(this.api);
  }

  // =========================================================
  // 2. Obtener personal por ID
  // =========================================================
  getPersonalById(id: number) {
    return this.http.get<Personal>(`${this.api}/${id}`);
  }

  // =========================================================
  // 3. Crear personal
  // =========================================================
  crearPersonal(data: any) {
    return this.http.post<Personal>(this.api, data);
  }

  // =========================================================
  // 4. Actualizar personal
  // =========================================================
  actualizarPersonal(id: number, data: any) {
    return this.http.put<Personal>(`${this.api}/${id}`, data);
  }

  // =========================================================
  // 5. Actualizar estado (activar / desactivar)
  // =========================================================
  actualizarEstado(id: number, estado: 'Activo' | 'Inactivo') {
    return this.http.patch(`${this.api}/${id}/estado`, { estado });
  }

  // =========================================================
  // 6. Eliminar personal
  // =========================================================
  eliminarPersonal(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // =========================================================
  // 7. Filtro avanzado: búsqueda + rol + estado
  // =========================================================
  filtrarPersonal(
    search: string = '',
    rol: string = '',
    estado: string = ''
  ) {
    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (rol) params = params.set('rol', rol);
    if (estado && estado !== 'Todos') params = params.set('estado', estado);

    return this.http.get<Personal[]>(`${this.api}/filtrar`, { params });
  }

  // =========================================================
  // 8. Obtener lista de roles desde el backend
  // =========================================================
  getRoles() {
    return this.http.get<string[]>(`${this.api}/roles`);
  }
}
