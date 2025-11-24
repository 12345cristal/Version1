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
      { path: 'inicio', component: Inicio },
      { path: 'citas', component: CitasComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'ninos', component: NinosComponent },
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
      
      // Ruta por defecto
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];
