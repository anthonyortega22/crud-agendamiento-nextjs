import { citasRepository } from '../repositories/citas'
import { pacientesRepository } from '../repositories/pacientes'
import { CitaInput, Cita } from '../types'


export const citasService = {
    async getAll() {
        return citasRepository.findAll()
    },

    async getById(id: string) {
        const cita = await citasRepository.findById(id)
        if (!cita) throw new Error('Cita no encontrada')
        return cita
    },

    async create(data: CitaInput) {
        const paciente = await pacientesRepository.findById(data.pacienteId)
        if (!paciente) throw new Error('El paciente no existe')

        const citas = await citasRepository.findByPaciente(data.pacienteId)
        const conflicto = citas.find(
            (c: Cita) => c.fecha === data.fecha && c.hora === data.hora
        )
        if (conflicto) throw new Error('El paciente ya tiene una cita en ese horario')

        return citasRepository.create(data)
    },

    async update(id: string, data: Partial<CitaInput>) {
        await citasService.getById(id)

        // Solo verificamos conflicto si se están cambiando fecha u hora
        if (data.fecha && data.hora) {
            const cita = await citasService.getById(id)
            const citas = await citasRepository.findByPaciente(cita.pacienteId)
            const conflicto = citas.find(
                (c: Cita) => c.id !== id && c.fecha === data.fecha && c.hora === data.hora
            )
            if (conflicto) throw new Error('Ya existe una cita en ese horario')
        }

        return citasRepository.update(id, data)
    },

    async delete(id: string) {
        await citasService.getById(id) // valida que existe
        return citasRepository.delete(id)
    },
}