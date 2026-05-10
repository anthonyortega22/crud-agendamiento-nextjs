/**
 * CAPA DE LÓGICA DE NEGOCIO — Pacientes
 *
 * Contiene las reglas de negocio (validaciones, restricciones).
 * Orquesta llamadas al repositorio. No sabe nada de HTTP ni de cómo
 * se almacenan los datos.
 */

import { pacientesRepository } from "../repositories/pacientes";
import { PacienteInput } from "../types";

export const pacientesService = {
  async getAll() {
    return pacientesRepository.findAll();
  },

  async getById(id: string) {
    const paciente = pacientesRepository.findById(id);
    if (!paciente) throw new Error("Paciente no encontrado");
    return paciente;
  },

  async create(data: PacienteInput) {
    const existente = pacientesRepository.findByEmail(data.email);
    if (existente) throw new Error("Ya existe un paciente con ese email");
    return pacientesRepository.create(data);
  },

  async update(id: string, data: Partial<PacienteInput>) {
    // Verificar que existe antes de actualizar
    await pacientesService.getById(id);

    // Si se cambia el email, verificar que no esté en uso por otro paciente
    if (data.email) {
      const existente = pacientesRepository.findByEmail(data.email);
      if (existente && existente.id !== id) {
        throw new Error("El email ya está en uso por otro paciente");
      }
    }

    const actualizado = pacientesRepository.update(id, data);
    if (!actualizado) throw new Error("No se pudo actualizar el paciente");
    return actualizado;
  },

  async delete(id: string) {
    await pacientesService.getById(id);
    pacientesRepository.delete(id);
  },
};
