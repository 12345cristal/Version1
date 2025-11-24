import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { PersonalService } from '../../services/personal.service';
import { SearchService } from '../../services/search.service';
import { Personal } from '../../../interfaces/personal/personal.interface';
import { AddPersonalModal } from './modal/add-personal.modal';

@Component({
  selector: 'app-personal',
  standalone: true,
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PersonalComponent {

  form!: FormGroup;

  // ===== Filtros =====
  search = '';
  selectedRole = '';
  selectedEstado: 'Todos' | 'Activo' | 'Inactivo' = 'Todos';
  view: 'cards' | 'table' | 'horarios' = 'cards';

  // ===== Datos =====
  roles: string[] = [];
  personal: Personal[] = [];

  // ===== Estadísticas =====
  totalPersonal = 0;
  totalTerapeutas = 0;
  totalActivos = 0;
  calificacionPromedio: number | null = null;

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private searchService: SearchService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre_completo: [''],
      fecha_nacimiento: [''],
      grado_academico: [''],
      rol: [''],
      especialidades: this.fb.array([]),
      horarios: this.fb.array([])
    });

    this.loadRoles();
    this.loadPersonal();

    // Ctrl + K
    this.searchService.search$.subscribe(q => {
      this.search = q;
      this.applyFilters();
    });
  }

  // =====================================================
  //           CARGAR ROLES DESDE BACKEND
  // =====================================================
  loadRoles() {
    this.personalService.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  // =====================================================
  //           OBTENER PERSONAL + ESTADISTICAS
  // =====================================================
  loadPersonal() {
    this.personalService.getPersonal().subscribe(res => {
      this.personal = res;
      this.computeStats(res);
    });
  }

  applyFilters() {
    this.personalService
      .filtrarPersonal(this.search, this.selectedRole, this.selectedEstado)
      .subscribe(res => {
        this.personal = res;
        this.computeStats(res);
      });
  }

  computeStats(list: Personal[]) {
    this.totalPersonal = list.length;
    this.totalActivos = list.filter(p => p.estado === 'Activo').length;
    this.totalTerapeutas = list.filter(p => p.rol?.toLowerCase().includes('terapeuta')).length;
    this.calificacionPromedio = null; // cuando lo agregues del backend
  }

  // =====================================================
  //                 CAMBIAR ESTADO
  // =====================================================
  toggleEstado(p: Personal) {
    const nuevo = p.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.personalService.actualizarEstado(p.id_personal, nuevo).subscribe(() => {
      this.applyFilters();
    });
  }

  // =====================================================
  //                 MODAL NUEVO PERSONAL
  // =====================================================
  openAddForm() {
    const ref = this.dialog.open(AddPersonalModal, {
      width: '480px',
      panelClass: 'personal-dialog',
      disableClose: true
    });

    ref.afterClosed().subscribe(data => {
      if (data) {
        // especialidades -> array
        data.especialidades = data.especialidades
          ? data.especialidades.split(',').map((e: string) => e.trim())
          : [];

        // Estado inicial = Activo
        data.estado = 'Activo';

        this.personalService.crearPersonal(data).subscribe(() => {
          this.loadPersonal();
        });
      }
    });
  }

  openDetalles(p: Personal) {}
  openEditar(p: Personal) {}

  // =====================================================
  //          MÉTODOS QUE FALTABAN (FILTRADO)
  // =====================================================
  onSearch(query: string) {
    this.search = query;
    this.applyFilters();
  }

  onRoleSelect(value: string) {
    this.selectedRole = value;
    this.applyFilters();
  }

  onEstadoSelect(estado: 'Todos' | 'Activo' | 'Inactivo') {
    this.selectedEstado = estado;
    this.applyFilters();
  }

  // =====================================================
  //                CAMBIO DE VISTA
  // =====================================================
  setView(view: 'cards' | 'table' | 'horarios') {
    this.view = view;
  }
}
