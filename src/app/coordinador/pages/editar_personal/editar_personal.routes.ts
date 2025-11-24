import { Routes } from '@angular/router';
import { EditarPersonalComponent } from './editar_personal.component';

export const EDITAR_PERSONAL_ROUTES: Routes = [
  {
    path: ':id',
    component: EditarPersonalComponent
  }
];
