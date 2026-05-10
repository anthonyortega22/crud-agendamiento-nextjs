export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
}

export type PacienteInput = Omit<Paciente, "id">;

export type EstadoCita = "pendiente" | "confirmada" | "cancelada";

export interface Cita {
  id: string;
  pacienteId: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: EstadoCita;
}

export type CitaInput = Omit<Cita, "id">;

// Tipo enriquecido que devuelve la cita con datos del paciente
export interface CitaConPaciente extends Cita {
  paciente: Paciente;
}
