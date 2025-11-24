import { HorarioLaboral } from "./horario.interface";

export interface Personal {
  id_personal: number;
  nombre_completo: string;
  especialidades: string[];
  rol: string;
  estado: 'Activo' | 'Inactivo';
  correo_personal: string;
  telefono_personal: string;
  fecha_ingreso: string;
  horarios: HorarioLaboral[];
}
