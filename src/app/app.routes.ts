import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'coordinador',
    loadChildren: () =>
      import('./coordinador/coordinador.routes').then(m => m.COORDINADOR_ROUTES)
  },
  {
    path: '',
    redirectTo: 'coordinador/inicio',
    pathMatch: 'full'
  }
];
