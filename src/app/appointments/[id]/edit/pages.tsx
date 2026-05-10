'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditarCitaPage() {
  const router = useRouter()
  const { id } = useParams()
  const [form, setForm] = useState({
        pacienteId: '', fecha: '', hora: '', motivo: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/cita/${id}`)
      .then(r => r.json())
      .then(data => setForm(data))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/cita/${id}`, {
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
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" value={form.apellido} onChange={handleChange} required />
        <input name="email" value={form.email} onChange={handleChange} required />
        <input name="telefono" value={form.telefono} onChange={handleChange} required />
        <input name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
}