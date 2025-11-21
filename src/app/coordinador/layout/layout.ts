import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ToolbarComponent } from '../../shared/toolbar/toolbar/toolbar';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-coordinador-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToolbarComponent,
    SidebarComponent
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {

  sidebarOpen: boolean = true;
  isMobile: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

  /**
   * Detecta cambios de tamaño en pantalla en tiempo real.
   * Si la pantalla es móvil, el sidebar se oculta.
   */
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  /**
   * Verificar si la pantalla es móvil o escritorio.
   * < 900px = se oculta el sidebar automáticamente
   */
  private checkScreenSize() {
    this.isMobile = window.innerWidth < 900;

    if (this.isMobile) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  /**
   * Se ejecuta cuando el usuario presiona la hamburguesa en el toolbar.
   * Si es móvil → abre/cierra tipo "drawer".
   * Si es escritorio → toggle normal.
   */
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
