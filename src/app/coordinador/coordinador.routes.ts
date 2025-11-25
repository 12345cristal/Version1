import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { PersonalComponent } from './pages/personal/personal.component';
import { NinosComponent } from './pages/ninos/ninos.component';
import { Reportes } from './pages/reportes/reportes';
import { Usuarios } from './pages/usuarios/usuarios';
import { Perfil } from './pages/perfil/perfil';
import { Configuracion } from './pages/configuracion/configuracion';
import { Horarios } from './pages/horarios/horarios';
import { Terapias } from './pages/terapias/terapias';
import { Asistencia } from './pages/asistencia/asistencia';
import { Expedientes } from './pages/expedientes/expedientes';
import { Mensajes } from './pages/mensajes/mensajes';
import { ReportesClinicos } from './pages/reportes-clinicos/reportes-clinicos';
import { LayoutComponent } from './layout/layout';
import { CitasComponent } from './pages/citas/citas';

export const COORDINADOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      // ================================
      // 📌 MÓDULOS PRINCIPALES
      // ================================
      { path: 'inicio', component: Inicio },
      { path: 'citas', component: CitasComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'ninos', component: NinosComponent },

      // ================================
      // 🚀 WIZARD — NUEVO NIÑO (5 PASOS)
      // ================================
      {
        path: 'ninos/nuevo',
        children: [
          {
            path: '1',
            loadComponent: () =>
              import('./pages/ninos/nuevo/paso1/paso1.component')
                .then(m => m.Paso1Component)
          },
          {
            path: '2',
            loadComponent: () =>
              import('./pages/ninos/nuevo/paso2/paso2.component')
                .then(m => m.Paso2Component)
          },
          {
            path: '3',
            loadComponent: () =>
              import('./pages/ninos/nuevo/paso3/paso3.component')
                .then(m => m.Paso3Component)
          },
          {
            path: '4',
            loadComponent: () =>
              import('./pages/ninos/nuevo/paso4/paso4.component')
                .then(m => m.Paso4Component)
          },
          {
            path: '5',
            loadComponent: () =>
              import('./pages/ninos/nuevo/paso5/paso5.component')
                .then(m => m.Paso5Component)
          },

          // 👉 /coordinador/ninos/nuevo → paso 1
          { path: '', redirectTo: '1', pathMatch: 'full' },

          // 👉 Si escribe algo raro → paso 1
          { path: '**', redirectTo: '1' }
        ]
      },

      // ================================
      // 📌 OTROS MÓDULOS
      // ================================
      { path: 'reportes', component: Reportes },
      { path: 'usuarios', component: Usuarios },
      { path: 'perfil', component: Perfil },
      { path: 'configuracion', component: Configuracion },
      { path: 'horarios', component: Horarios },
      { path: 'terapias', component: Terapias },
      { path: 'asistencia', component: Asistencia },
      { path: 'expedientes', component: Expedientes },
      { path: 'mensajes', component: Mensajes },
      { path: 'reportes-clinicos', component: ReportesClinicos },

      // ================================
      // 🏠 RUTA POR DEFECTO
      // ================================
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];
