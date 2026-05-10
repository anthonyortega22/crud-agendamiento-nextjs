'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NuevoPacientePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '',
    telefono: '', fechaNacimiento: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
      return
    }
    router.push('/pacientes')
  }

  return (
    <div>
      <h1>Nuevo paciente</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        <input name="fechaNacimiento" type="date" onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}