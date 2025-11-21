import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {

  @Input() opened: boolean = true;
  @Output() close = new EventEmitter<void>();

  routes = [
    { label: 'Inicio', icon: 'home', path: '/coordinador/inicio' },
    { label: 'Citas', icon: 'event', path: '/coordinador/citas' },
    { label: 'Personal', icon: 'groups', path: '/coordinador/personal' },
    { label: 'Niños beneficiados', icon: 'child_care', path: '/coordinador/ninos' },
    { label: 'Reportes', icon: 'assessment', path: '/coordinador/reportes' },
    { label: 'Usuarios', icon: 'manage_accounts', path: '/coordinador/usuarios' },
    { label: 'Perfil', icon: 'person', path: '/coordinador/perfil' },
    { label: 'Configuración', icon: 'settings', path: '/coordinador/configuracion' },
    { label: 'Horarios', icon: 'schedule', path: '/coordinador/horarios' },
    { label: 'Terapias', icon: 'volunteer_activism', path: '/coordinador/terapias' },
    { label: 'Asistencia', icon: 'check_circle', path: '/coordinador/asistencia' },
    { label: 'Expedientes médicos', icon: 'folder_shared', path: '/coordinador/expedientes' },
    { label: 'Mensajes', icon: 'chat', path: '/coordinador/mensajes' },
    { label: 'Reportes clínicos', icon: 'medical_information', path: '/coordinador/reportes-clinicos' }
  ];
}
