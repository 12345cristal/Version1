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
  selector: 'app-nuevo-nino-paso3',
  standalone: true,
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class Paso3Component implements OnInit {

  formulario!: FormGroup;
  relaciones: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogos: CatalogosService,
    private pages: PagesNinoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      contactoPrincipalNombre: ['', Validators.required],
      contactoPrincipalRelacion: ['', Validators.required],
      contactoPrincipalTelefono: ['', Validators.required]
    });

    const data = this.pages.getAll();
    this.formulario.patchValue(data);

    this.catalogos.getRelaciones().subscribe(v => (this.relaciones = v ?? []));
  }

  anterior() {
    this.pages.saveStep(this.formulario.getRawValue());
    this.router.navigate(['/coordinador/ninos/nuevo/paso2']);
  }

  siguiente() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.pages.saveStep(this.formulario.value);
  this.router.navigate(['/coordinador/ninos/nuevo/4']);
}



}
