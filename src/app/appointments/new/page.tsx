'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Paciente {
  id: string
  nombre: string
  apellido: string
}

export default function NuevaCitaPage() {
  const router = useRouter()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [form, setForm] = useState({
    pacienteId: '',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'pendiente',
  })
  const [error, setError] = useState('')

  // Carga la lista de pacientes para el selector
  useEffect(() => {
    const cargar = async () => {
      const res = await fetch('/api/pacientes')
      const data = await res.json()
      setPacientes(data)
    }
    cargar()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/citas', {
      method: 'POST',
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
      <h1>Nueva cita</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>

        <select name="pacienteId" onChange={handleChange} required>
          <option value="">Selecciona un paciente</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <input name="fecha" type="date" onChange={handleChange} required />
        <input name="hora" type="time" onChange={handleChange} required />
        <input name="motivo" placeholder="Motivo" onChange={handleChange} required />

        <select name="estado" onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}