import { db } from "../lib/db";
import { Paciente, PacienteInput } from "../types";

export const pacientesRepository = {
  findAll(): Paciente[] {
    return [...db.pacientes];
  },

  findById(id: string): Paciente | null {
    return db.pacientes.find((p) => p.id === id) ?? null;
  },

  findByEmail(email: string): Paciente | null {
    return db.pacientes.find((p) => p.email === email) ?? null;
  },

  create(data: PacienteInput): Paciente {
    const nuevo: Paciente = { id: crypto.randomUUID(), ...data };
    db.pacientes.push(nuevo);
    return { ...nuevo };
  },

  update(id: string, data: Partial<PacienteInput>): Paciente | null {
    const idx = db.pacientes.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.pacientes[idx] = { ...db.pacientes[idx], ...data };
    return { ...db.pacientes[idx] };
  },

  delete(id: string): boolean {
    const idx = db.pacientes.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    db.pacientes.splice(idx, 1);
    return true;
  },
};
