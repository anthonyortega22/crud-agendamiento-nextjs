/**
 * CAPA DE LÓGICA DE NEGOCIO — Citas
 *
 * Contiene las reglas de negocio (validaciones, restricciones).
 * Orquesta llamadas a los repositorios. No sabe nada de HTTP ni de
 * cómo se almacenan los datos.
 */

import { citasRepository } from "../repositories/citas";
import { pacientesRepository } from "../repositories/pacientes";
import { CitaInput } from "../types";

export const citasService = {
  async getAll() {
    return citasRepository.findAll();
  },

  async getById(id: string) {
    const cita = citasRepository.findById(id);
    if (!cita) throw new Error("Cita no encontrada");
    return cita;
  },

  async create(data: CitaInput) {
    const paciente = pacientesRepository.findById(data.pacienteId);
    if (!paciente) throw new Error("El paciente no existe");

    const citasDelPaciente = citasRepository.findByPaciente(data.pacienteId);
    const conflicto = citasDelPaciente.find(
      (c) => c.fecha === data.fecha && c.hora === data.hora,
    );
    if (conflicto)
      throw new Error("El paciente ya tiene una cita en ese horario");

    return citasRepository.create({ ...data, estado: "pendiente" });
  },
  async update(id: string, data: Partial<CitaInput>) {
    const cita = await citasService.getById(id);

    // Regla de negocio: verificar conflicto de horario si se cambia fecha/hora
    if (data.fecha && data.hora) {
      const citasDelPaciente = citasRepository.findByPaciente(cita.pacienteId);
      const conflicto = citasDelPaciente.find(
        (c) => c.id !== id && c.fecha === data.fecha && c.hora === data.hora,
      );
      if (conflicto) throw new Error("Ya existe una cita en ese horario");
    }

    const actualizada = citasRepository.update(id, data);
    if (!actualizada) throw new Error("No se pudo actualizar la cita");
    return actualizada;
  },

  async delete(id: string) {
    await citasService.getById(id);
    citasRepository.delete(id);
  },
};
