import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { 
  CitasService,
  Cita,
  CrearActualizarCitaDTO 
} from '../../../services/citas.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './citas.html',
  styleUrls: ['./citas.scss']
})
export class CitasComponent implements OnInit {

  citas = signal<Cita[]>([]);
  modalVisible = signal(false);
  editando = signal(false);

  citaSeleccionada: Cita | null = null;
  citaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private themeService: ThemeService
  ) {
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      nino_nombre: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tipo_cita: ['OBSERVACION', Validators.required],
      motivo: ['', Validators.required],
      servicio: ['', Validators.required],
      notas: [''],
      lugar: ['']
    });
  }

  get theme(): 'light' | 'dark' {
    return this.themeService.currentTheme;
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citasService.getCitas().subscribe({
      next: (data: Cita[]) => this.citas.set(data),
      error: (err) => console.error(err)
    });
  }

  abrirNueva() {
    this.editando.set(false);
    this.citaSeleccionada = null;
    this.citaForm.reset({ tipo_cita: 'OBSERVACION' });
    this.modalVisible.set(true);
  }

  abrirEdicion(cita: Cita) {
    this.editando.set(true);
    this.citaSeleccionada = cita;
    this.citaForm.patchValue(cita);
    this.modalVisible.set(true);
  }

  cerrarModal() {
    this.modalVisible.set(false);
  }

  guardar() {
    if (this.citaForm.invalid) return;

    const data = this.citaForm.value as CrearActualizarCitaDTO;

    if (this.editando() && this.citaSeleccionada) {
      this.citasService.actualizarCita(this.citaSeleccionada.id_cita, data)
        .subscribe(() => {
          this.cargarCitas();
          this.cerrarModal();
        });

      return;
    }

    this.citasService.crearCita(data)
      .subscribe(() => {
        this.cargarCitas();
        this.cerrarModal();
      });
  }

  cancelar(cita: Cita) {
    if (!confirm('¿Cancelar esta cita?')) return;

    this.citasService.cancelarCita(cita.id_cita)
      .subscribe(() => this.cargarCitas());
  }
}
