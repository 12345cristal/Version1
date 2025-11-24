import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-personal-modal',
  standalone: true,
  templateUrl: './add-personal.modal.html',
  styleUrls: ['./add-personal.modal.scss'],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AddPersonalModal {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPersonalModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      nombre_completo: ['', Validators.required],
      correo_personal: ['', Validators.required],
      telefono_personal: ['', Validators.required],
      rol: ['', Validators.required],
      especialidades: ['']
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
