export interface ContactoEmergencia {
  nombre: string;
  relacion: string;
  telefono: string;
  email: string;
}

export interface SeguroMedico {
  proveedor: string;
  numeroPoliza: string;
}

export interface Direccion {
  direccionCompleta: string;
  ciudad: string;
  codigoPostal: string;
}

export interface PreferenciasNino {
  actividadesIntereses: string;
  miedosAversiones: string;
  estrategiasCalma: string;
  observacionesAdicionales: string;
}

export interface Nino {
  id?: number;

  // Datos personales
  nombreCompleto: string;
  apodos?: string;
  fechaNacimiento: string; // ISO
  edad?: number;
  genero: 'Masculino' | 'Femenino' | 'Otro';
  lugarNacimiento?: string;

  fotoUrl?: string;

  // Tutor principal
  padreTutor: string;
  telefono: string;

  // Información médica
  tipoSangre?: string;
  diagnosticoPrincipal: string;
  diagnosticosSecundarios?: string;
  alergias?: string;
  medicamentosActuales?: string;
  restriccionesAlimentarias?: string;
  otrasCondicionesMedicas?: string;
  nivelDesarrollo?: string;
  habilidadesComunicacion?: string;
  necesidadesApoyos?: string;

  // Contacto emergencia
  contactoEmergenciaPrincipal: ContactoEmergencia;
  contactoEmergenciaSecundario?: ContactoEmergencia;

  // Seguro y dirección
  seguroMedico?: SeguroMedico;
  direccionResidencia?: Direccion;

  // Documentos (por ahora sólo nombres)
  documentos?: string[];

  // Preferencias
  preferencias?: PreferenciasNino;

  // Estado en el sistema
  estado: 'ACTIVO' | 'INACTIVO';
  fechaRegistro?: string;
  fechaBaja?: string | null;

  // Para tarjetas
  progresoGeneral?: number;   // 0–100
  terapias?: string[];
}
