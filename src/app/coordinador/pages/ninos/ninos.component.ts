import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { NinosService } from '../../../services/ninos.service';
import { Nino } from '../../../interfaces/nuevo_beneficiario/nino.interface';

@Component({
  selector: 'app-ninos',
  standalone: true,
  templateUrl: './ninos.component.html',
  styleUrls: ['./ninos.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule
  ]
})
export class NinosComponent implements OnInit {

  private servicio = inject(NinosService);
  private router = inject(Router);

  ninos = signal<Nino[]>([]);
  filtrados = signal<Nino[]>([]);
  mostrarInactivos = signal(false);
  busqueda = signal('');

  total = signal(0);
  activos = signal(0);
  nuevosMes = signal(0);
  progresoPromedio = signal(0);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.servicio.listar().subscribe(lista => {
      this.ninos.set(lista);
      this.actualizarFiltros();
    });
  }

  actualizarFiltros() {
    const activos = !this.mostrarInactivos();
    const term = this.busqueda().toLowerCase();

    const filtrado = this.ninos().filter(n =>
      (activos ? n.estado === 'ACTIVO' : n.estado === 'INACTIVO') &&
      (
        n.nombreCompleto.toLowerCase().includes(term) ||
        (n.padreTutor || '').toLowerCase().includes(term)
      )
    );

    this.filtrados.set(filtrado);

    this.total.set(this.ninos().length);
    this.activos.set(this.ninos().filter(n => n.estado === 'ACTIVO').length);

    this.nuevosMes.set(
      this.ninos().filter(n =>
        n.fechaRegistro?.startsWith(new Date().toISOString().slice(0, 7))
      ).length
    );

    const p = filtrado.reduce((s, n) => s + (n.progresoGeneral || 0), 0);
    this.progresoPromedio.set(filtrado.length ? Math.round(p / filtrado.length) : 0);
  }

  buscar(event: any) {
    this.busqueda.set(event.target.value);
    this.actualizarFiltros();
  }

  verActivos() {
    this.mostrarInactivos.set(false);
    this.actualizarFiltros();
  }

  verInactivos() {
    this.mostrarInactivos.set(true);
    this.actualizarFiltros();
  }

  abrirNuevo() {
    this.router.navigate(['/coordinador/ninos/nuevo']);
  }

  editar(n: Nino) {
    this.router.navigate(['/coordinador/ninos/editar', n.id]);
  }

  toggleEstado(n: Nino) {
    const nuevo = n.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    this.servicio.cambiarEstado(n.id!, nuevo).subscribe(() => this.cargar());
  }

  verPerfil(n: Nino) {
    this.router.navigate(['/coordinador/ninos/perfil', n.id]);
  }
}
