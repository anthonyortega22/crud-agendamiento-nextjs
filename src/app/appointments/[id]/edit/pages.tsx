'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Paciente {
  id: string
  nombre: string
  apellido: string
}

export default function EditarCitaPage() {
  const router = useRouter()
  const { id } = useParams()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [form, setForm] = useState({
    pacienteId: '',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const cargar = async () => {
      // Carga la cita actual y la lista de pacientes en paralelo
      const [resCita, resPacientes] = await Promise.all([
        fetch(`/api/citas/${id}`),
        fetch('/api/pacientes'),
      ])
      const cita = await resCita.json()
      const listaPacientes = await resPacientes.json()

      setForm({
        pacienteId: cita.pacienteId,
        fecha: cita.fecha,
        hora: cita.hora,
        motivo: cita.motivo,
        estado: cita.estado,
      })
      setPacientes(listaPacientes)
    }
    cargar()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/citas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
      return
    }
    router.push('/citas')
  }

  return (
    <div>
      <h1>Editar cita</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>

        <select name="pacienteId" value={form.pacienteId} onChange={handleChange} required>
          <option value="">Selecciona un paciente</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
        <input name="hora" type="time" value={form.hora} onChange={handleChange} required />
        <input name="motivo" value={form.motivo} onChange={handleChange} required />

        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
}