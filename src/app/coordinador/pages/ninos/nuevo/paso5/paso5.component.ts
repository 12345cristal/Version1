import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PagesNinoService } from '../../../../../services/pages.service';
import { NinosService } from '../../../../../services/ninos.service';
import { Nino } from '../../../../../interfaces/nuevo_beneficiario/nino.interface';

@Component({
  selector: 'app-nuevo-nino-paso5',
  standalone: true,
  templateUrl: './paso5.component.html',
  styleUrls: ['./paso5.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class Paso5Component implements OnInit {

  formulario!: FormGroup;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pages: PagesNinoService,
    private ninosService: NinosService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      actividadesIntereses: [''],
      miedosAversiones: [''],
      estrategiasCalma: ['']
    });

    const data = this.pages.getAll();
    this.formulario.patchValue(data);
  }

  anterior() {
  this.pages.saveStep(this.formulario.getRawValue());
  this.router.navigate(['/coordinador/ninos/nuevo/paso4']);
}


  guardar() {
    this.guardando = true;

    this.pages.saveStep(this.formulario.getRawValue());
    const payload = this.pages.getAll() as Nino;

    this.ninosService.crear(payload).subscribe({
      next: () => {
        this.pages.reset();
        this.guardando = false;
        this.router.navigate(['/coordinador/ninos']);
      },
      error: (err) => {
        console.error('Error al crear niño', err);
        this.guardando = false;
        // aquí podrías mostrar un snackbar/toast
      }
    });
  }
}
