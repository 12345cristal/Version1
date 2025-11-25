import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogosService } from '../../../../services/catalogo.service';
import { NinosService } from '../../../../services/ninos.service';
import { Nino } from '../../../../interfaces/nuevo_beneficiario/nino.interface';

@Component({
  selector: 'app-nino-form',
  standalone: true,
  templateUrl: './nino-form-dialog.component.html',
  styleUrls: ['./nino-form-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatOptionModule
  ]
})
export class NinoFormDialogComponent implements OnInit {

  formulario!: FormGroup;

  pasoActual = signal(1);
  totalPasos = 5;

  titulo = 'Agregar Nuevo Beneficiario';

  tiposSangre: string[] = [];
  generos: string[] = [];
  diagnosticos: string[] = [];
  relaciones: string[] = [];
  nivelesDesarrollo: string[] = [];

  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private catalogos: CatalogosService,
    private ninosService: NinosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.titulo = this.id
      ? 'Editar Beneficiario'
      : 'Agregar Nuevo Beneficiario';

    this.formulario = this.fb.group({
      nombreCompleto: ['', Validators.required],
      apodos: [''],
      fechaNacimiento: ['', Validators.required],
      edad: [{ value: '', disabled: true }],
      genero: ['', Validators.required],
      lugarNacimiento: [''],

      padreTutor: ['', Validators.required],
      telefono: ['', Validators.required],

      tipoSangre: [''],
      diagnosticoPrincipal: ['', Validators.required],
      diagnosticosSecundarios: [''],
      alergias: [''],
      medicamentosActuales: [''],
      restriccionesAlimentarias: [''],
      otrasCondicionesMedicas: [''],

      contactoPrincipalNombre: ['', Validators.required],
      contactoPrincipalRelacion: ['', Validators.required],
      contactoPrincipalTelefono: ['', Validators.required],

      nivelDesarrollo: [''],
      actividadesIntereses: [''],
      miedosAversiones: [''],
      estrategiasCalma: ['']
    });

    // Cargar catálogos
    this.catalogos.getTiposSangre().subscribe(v => this.tiposSangre = v ?? []);
    this.catalogos.getGeneros().subscribe(v => this.generos = v ?? []);
    this.catalogos.getDiagnosticos().subscribe(v => this.diagnosticos = v ?? []);
    this.catalogos.getRelaciones().subscribe(v => this.relaciones = v ?? []);
    this.catalogos.getNivelesDesarrollo().subscribe(v => this.nivelesDesarrollo = v ?? []);

    // Si es edición, cargar datos
    if (this.id) {
      this.ninosService.obtener(this.id).subscribe(data => {
        this.formulario.patchValue(data);

        if (data.fechaNacimiento) {
          this.formulario.get('edad')?.setValue(this.calcularEdad(data.fechaNacimiento));
        }
      });
    }

    // Calcular edad
    this.formulario.get('fechaNacimiento')?.valueChanges.subscribe(date => {
      if (date) {
        this.formulario.get('edad')?.setValue(this.calcularEdad(date));
      }
    });
  }

  calcularEdad(date: string | Date): number {
    const fn = new Date(date);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fn.getFullYear();
    const m = hoy.getMonth() - fn.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) edad--;
    return edad;
  }

  cerrar() {
    this.router.navigate(['/coordinador/ninos']);
  }

  siguiente() {
    if (this.pasoActual() < this.totalPasos) {
      this.pasoActual.set(this.pasoActual() + 1);
    }
  }

  anterior() {
    if (this.pasoActual() > 1) {
      this.pasoActual.set(this.pasoActual() - 1);
    }
  }

  guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = this.formulario.getRawValue();

    if (this.id) {
      this.ninosService.actualizar(this.id, payload).subscribe(() => {
        this.router.navigate(['/coordinador/ninos']);
      });

    } else {
      this.ninosService.crear(payload).subscribe(() => {
        this.router.navigate(['/coordinador/ninos']);
      });
    }
  }

  get step() {
    return this.pasoActual();
  }

}
