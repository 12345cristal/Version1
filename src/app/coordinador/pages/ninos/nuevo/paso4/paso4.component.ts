import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PagesNinoService } from '../../../../../services/pages.service';

@Component({
  selector: 'app-nuevo-nino-paso4',
  standalone: true,
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class Paso4Component {

  constructor(
    private router: Router,
    private pages: PagesNinoService
  ) {}

  anterior() {
    // Guardar cualquier info del paso 4 si existiera
    this.pages.saveStep({});

    this.router.navigate(['/coordinador/ninos/nuevo/paso3']);
  }

 siguiente() {
  this.pages.saveStep({});
  this.router.navigate(['/coordinador/ninos/nuevo/5']);
}



}
