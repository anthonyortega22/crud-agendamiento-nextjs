//esta clase se encarga de definir las interfaces para los tipos de datos que se van a utilizar en la aplicación
//como Paciente y Cita, así como los tipos de entrada para crear nuevos pacientes y citas.

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
}

export interface Cita {
  id: string;
  pacienteId: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: "pendiente" | "confirmada" | "cancelada";
}

// Tipos de entrada para crear nuevos pacientes y citas, omitiendo el campo 'id' que se genera automáticamente.
export type PacienteInput = Omit<Paciente, "id">;
export type CitaInput = Omit<Cita, "id">;
