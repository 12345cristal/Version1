import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class ToolbarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  theme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(t => this.theme = t);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  irPerfil() { /* navegar */ }
  irConfig() { /* navegar */ }
  logout() { /* cerrar sesión */ }
}
