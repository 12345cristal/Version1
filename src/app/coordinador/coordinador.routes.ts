import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio/inicio';
import { Citas } from './pages/citas/citas/citas';
import { Personal } from './pages/personal/personal/personal';
import { Ninos} from './pages/ninos/ninos/ninos';
import { Reportes } from './pages/reportes/reportes/reportes';
import { Usuarios } from './pages/usuarios/usuarios/usuarios';
import { Perfil } from './pages/perfil/perfil/perfil';
import { Configuracion } from './pages/configuracion/configuracion/configuracion';
import { Horarios } from './pages/horarios/horarios/horarios';
import { Terapias } from './pages/terapias/terapias/terapias';
import { Asistencia } from './pages/asistencia/asistencia/asistencia';
import { Expedientes } from './pages/expedientes/expedientes/expedientes';
import { Mensajes } from './pages/mensajes/mensajes/mensajes';
import { ReportesClinicos } from './pages/reportes-clinicos/reportes-clinicos/reportes-clinicos';
import { LayoutComponent } from './layout/layout';


export const COORDINADOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'inicio', component: Inicio },
      { path: 'citas', component: Citas },
      { path: 'personal', component: Personal },
      { path: 'ninos', component: Ninos },
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
