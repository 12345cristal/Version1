import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { CatalogosService } from '../../../../../services/catalogo.service';
import { PagesNinoService } from '../../../../../services/pages.service';
@Component({
  selector: 'app-nuevo-nino-paso2',
  standalone: true,
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class Paso2Component implements OnInit {

  formulario!: FormGroup;

  tiposSangre: string[] = [];
  diagnosticos: string[] = [];
  nivelesDesarrollo: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogos: CatalogosService,
    private pages: PagesNinoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tipoSangre: [''],
      diagnosticoPrincipal: ['', Validators.required],
      diagnosticosSecundarios: [''],
      alergias: [''],
      medicamentosActuales: [''],
      restriccionesAlimentarias: [''],
      otrasCondicionesMedicas: [''],
      nivelDesarrollo: ['']
    });

    const data = this.pages.getAll();
    this.formulario.patchValue(data);

    this.catalogos.getTiposSangre().subscribe(v => (this.tiposSangre = v ?? []));
    this.catalogos.getDiagnosticos().subscribe(v => (this.diagnosticos = v ?? []));
    this.catalogos.getNivelesDesarrollo().subscribe(v => (this.nivelesDesarrollo = v ?? []));
  }

  anterior() {
    this.pages.saveStep(this.formulario.getRawValue());
    this.router.navigate(['/coordinador/ninos/nuevo/paso1']);
  }

  siguiente() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.pages.saveStep(this.formulario.value);
  this.router.navigate(['/coordinador/ninos/nuevo/3']);
}



}
