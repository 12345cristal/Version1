import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CatalogosService } from '../../../../../services/catalogo.service';
import { PagesNinoService} from '../../../../../services/pages.service';

@Component({
  selector: 'app-nuevo-nino-paso1',
  standalone: true,
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class Paso1Component implements OnInit {

  formulario!: FormGroup;
  generos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private catalogos: CatalogosService,
    private pages: PagesNinoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombreCompleto: ['', Validators.required],
      apodos: [''],
      fechaNacimiento: ['', Validators.required],
      edad: [{ value: '', disabled: true }],
      genero: ['', Validators.required],
      lugarNacimiento: [''],
      padreTutor: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    // cargar datos si el usuario ya había empezado
    const data = this.pages.getAll();
    this.formulario.patchValue(data);

    this.catalogos.getGeneros().subscribe(g => (this.generos = g ?? []));

    // calcular edad
    this.formulario.get('fechaNacimiento')?.valueChanges.subscribe(date => {
      if (date) {
        this.formulario.get('edad')?.setValue(this.calcularEdad(date));
      }
    });
  }

  private calcularEdad(date: string | Date): number {
    const fn = new Date(date);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fn.getFullYear();
    const m = hoy.getMonth() - fn.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fn.getDate())) {
      edad--;
    }
    return edad;
  }

  cancelar() {
    this.pages.reset();
    this.router.navigate(['/coordinador/ninos']);
  }

  siguiente() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.pages.saveStep(this.formulario.value);
  this.router.navigate(['/coordinador/ninos/nuevo/2']);
}



}
