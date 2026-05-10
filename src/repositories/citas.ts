import { db } from "../lib/db";
import { Cita, CitaConPaciente, CitaInput } from "../types";

function enriquecerCita(cita: Cita): CitaConPaciente | null {
  const paciente = db.pacientes.find((p) => p.id === cita.pacienteId);
  if (!paciente) return null;
  return { ...cita, paciente: { ...paciente } };
}

export const citasRepository = {
  findAll(): CitaConPaciente[] {
    return db.citas
      .map(enriquecerCita)
      .filter((c): c is CitaConPaciente => c !== null);
  },

  findById(id: string): CitaConPaciente | null {
    const cita = db.citas.find((c) => c.id === id);
    if (!cita) return null;
    return enriquecerCita(cita);
  },

  findByPaciente(pacienteId: string): CitaConPaciente[] {
    return db.citas
      .filter((c) => c.pacienteId === pacienteId)
      .map(enriquecerCita)
      .filter((c): c is CitaConPaciente => c !== null);
  },

  create(data: CitaInput): CitaConPaciente {
    const nueva: Cita = { id: crypto.randomUUID(), ...data };
    db.citas.push(nueva);
    return enriquecerCita(nueva) as CitaConPaciente;
  },

  update(id: string, data: Partial<CitaInput>): CitaConPaciente | null {
    const idx = db.citas.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    db.citas[idx] = { ...db.citas[idx], ...data };
    return enriquecerCita(db.citas[idx]);
  },

  delete(id: string): boolean {
    const idx = db.citas.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    db.citas.splice(idx, 1);
    return true;
  },
};
