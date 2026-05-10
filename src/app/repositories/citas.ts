import { prisma } from "../lib/prisma"
import { CitaInput } from "../types";

export const citasRepository = {

    findAll() {
        return prisma.cita.findMany({ include: { paciente: true } })
    },

    findById(id: string) {
        return prisma.cita.findUnique({
            where: {
                id
            },
            include: { paciente: true }
        })
    },

    findByPaciente(PacienteId: string) {
        return prisma.cita.findMany({
            where: {
                pacienteId: PacienteId
            },
            include: { paciente: true }
        })
    },

    create(data: CitaInput) {
        return prisma.cita.create({
            data
        })
    },

    update(id: string, data: Omit<Partial<CitaInput>, 'id'>) {
        return prisma.cita.update({
            where: { id },
            data: {
                ...(data.fecha && { fecha: data.fecha }),
                ...(data.hora && { hora: data.hora }),
                ...(data.motivo && { motivo: data.motivo }),
                ...(data.estado && { estado: data.estado }),
                ...(data.pacienteId && { pacienteId: data.pacienteId }),
            },
        })
    },

    delete(id: string) {
        return prisma.cita.delete({
            where: { id }
        })
    },



}