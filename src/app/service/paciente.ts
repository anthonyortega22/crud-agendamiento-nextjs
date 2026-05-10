import { pacientesRepository } from "../repositories/pacientes"
import { PacienteInput } from "../types"

export const pacientesService = {
  async getAll() {
    return pacientesRepository.findAll()
  },

  async getById(id: string) {
    const paciente = await pacientesRepository.findById(id)
    if (!paciente) throw new Error("Paciente no encontrado")
    return paciente
  },

  async create(data: PacienteInput) {
    const existente = await pacientesRepository.findByEmail(data.email)
    if (existente) throw new Error("Ya existe un paciente con ese email")
    return pacientesRepository.create(data)
  },

  async update(id: string, data: Partial<PacienteInput>) {
    await pacientesService.getById(id)
    return pacientesRepository.update(id, data)
  },

  async delete(id: string) {
    await pacientesService.getById(id)
    return pacientesRepository.delete(id)
  },
}