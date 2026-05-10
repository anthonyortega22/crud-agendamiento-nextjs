import { prisma } from "../lib/prisma"
import { PacienteInput } from "../types"

export const pacientesRepository = {
  findAll() {
    return prisma.paciente.findMany()
  },

  findById(id: string) {
    return prisma.paciente.findUnique({ where: { id } })
  },

  findByEmail(email: string) {
    return prisma.paciente.findUnique({ where: { email } })
  },

  create(data: PacienteInput) {
    return prisma.paciente.create({ data })
  },

  update(id: string, data: Partial<PacienteInput>) {
    return prisma.paciente.update({ where: { id }, data })
  },

  delete(id: string) {
    return prisma.paciente.delete({ where: { id } })
  },
}