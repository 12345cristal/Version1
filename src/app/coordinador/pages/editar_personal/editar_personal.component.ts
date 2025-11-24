import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { PersonalService } from '../../services/personal.service';
import { Personal } from '../../../interfaces/personal/personal.interface';

@Component({
  standalone: true,
  selector: 'app-editar-personal',
  templateUrl: 'editar_personal.component.html',
  styleUrls: ['editar_personal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
  ]
})
export class EditarPersonalComponent {

  id!: number;
  cargando = true;

  formDatos!: FormGroup;
  formDomicilio!: FormGroup;
  formDocs!: FormGroup;

  personal!: Personal;

  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.formDatos = this.fb.group({
      nombre_completo: ['', Validators.required],
      correo_personal: ['', Validators.required],
      telefono_personal: ['', Validators.required],
      rol: ['', Validators.required],
      especialidades: [''],
      fecha_nacimiento: [''],
      grado_academico: [''],
    });

    this.formDomicilio = this.fb.group({
      domicilio_calle: [''],
      domicilio_colonia: [''],
      domicilio_cp: [''],
      domicilio_municipio: [''],
      domicilio_estado: [''],
    });

    this.formDocs = this.fb.group({
      rfc: [''],
      curp: [''],
      ine: [''],
      experiencia: [''],
      cv_archivo: [''], // archivo
    });

    this.cargarDatos();
  }

  cargarDatos() {
    this.personalService.getPersonalById(this.id).subscribe((data) => {
      this.personal = data;

      this.formDatos.patchValue(data);
      this.formDomicilio.patchValue(data);
      this.formDocs.patchValue(data);

      this.cargando = false;
    });
  }

  guardarDatos() {
    this.personalService.actualizarPersonal(this.id, this.formDatos.value).subscribe(() => {
      alert('Datos guardados correctamente');
    });
  }

  guardarDomicilio() {
    this.personalService.actualizarPersonal(this.id, this.formDomicilio.value).subscribe(() => {
      alert('Domicilio actualizado correctamente');
    });
  }

  guardarDocs() {
    this.personalService.actualizarPersonal(this.id, this.formDocs.value).subscribe(() => {
      alert('Documentos actualizados correctamente');
    });
  }
}
