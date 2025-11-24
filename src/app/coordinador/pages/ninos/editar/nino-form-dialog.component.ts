import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';

import { CatalogosService } from '../../../../services/catalogo.service';
import { NinosService } from '../../../../services/ninos.service';
import { Nino } from '../../../../interfaces/nuevo_beneficiario/nino.interface';

@Component({
  selector: 'app-nino-form-dialog',
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

  constructor(
    private fb: FormBuilder,
    private catalogos: CatalogosService,
    private ninosService: NinosService,
    private dialogRef: MatDialogRef<NinoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Nino | null
  ) {}

  ngOnInit(): void {

    this.titulo = this.data
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

    // Cargar catálogos desde backend
    this.catalogos.getTiposSangre().subscribe(v => this.tiposSangre = v ?? []);
    this.catalogos.getGeneros().subscribe(v => this.generos = v ?? []);
    this.catalogos.getDiagnosticos().subscribe(v => this.diagnosticos = v ?? []);
    this.catalogos.getRelaciones().subscribe(v => this.relaciones = v ?? []);
    this.catalogos.getNivelesDesarrollo().subscribe(v => this.nivelesDesarrollo = v ?? []);

    // Si es edición, rellenar
    if (this.data) {
      this.formulario.patchValue(this.data);

      if (this.data.fechaNacimiento) {
        const edad = this.calcularEdad(this.data.fechaNacimiento);
        this.formulario.get('edad')?.setValue(edad);
      }
    }

    // Calcular edad automáticamente
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
    if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) {
      edad--;
    }

    return edad;
  }

  cerrar() {
    this.dialogRef.close(false);
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

    if (this.data?.id) {
      this.ninosService.actualizar(this.data.id, payload).subscribe(() => {
        this.dialogRef.close(true);
      });

    } else {
      this.ninosService.crear(payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
  get step() {
  return this.pasoActual();
}


}
