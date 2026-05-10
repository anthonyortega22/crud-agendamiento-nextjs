import { prisma } from "../lib/prisma"
import { CitaInput } from "../types"

export const citasRepository = {
  findAll() {
    return prisma.cita.findMany({ include: { paciente: true } })
  },

  findById(id: string) {
    return prisma.cita.findUnique({
      where: { id },
      include: { paciente: true },
    })
  },

  findByPaciente(pacienteId: string) {
    return prisma.cita.findMany({
      where: { pacienteId },
      include: { paciente: true },
    })
  },

  create(data: CitaInput) {
    return prisma.cita.create({ data })
  },

  update(id: string, data: Partial<CitaInput>) {
    return prisma.cita.update({
      where: { id },
      data: {
        ...(data.fecha      !== undefined && { fecha:      data.fecha }),
        ...(data.hora       !== undefined && { hora:       data.hora }),
        ...(data.motivo     !== undefined && { motivo:     data.motivo }),
        ...(data.estado     !== undefined && { estado:     data.estado }),
        ...(data.pacienteId !== undefined && { pacienteId: data.pacienteId }),
      },
    })
  },

  delete(id: string) {
    return prisma.cita.delete({ where: { id } })
  },
}