'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Paciente { id: string; nombre: string; apellido: string }

export default function EditarCitaPage() {
  const router = useRouter()
  const { id } = useParams()
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [form, setForm] = useState({ pacienteId: '', fecha: '', hora: '', motivo: '', estado: 'pendiente' })
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      const [resCita, resPacientes] = await Promise.all([
        fetch(`/api/appointments/${id}`),
        fetch('/api/patients'),
      ])
      const cita = await resCita.json()
      const listaPacientes = await resPacientes.json()
      setForm({ pacienteId: cita.pacienteId, fecha: cita.fecha, hora: cita.hora, motivo: cita.motivo, estado: cita.estado })
      setPacientes(listaPacientes)
    }
    if (id) cargar()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGuardando(true)
    setError('')
    const res = await fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
      setGuardando(false)
      return
    }
    router.push('/appointments')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/appointments" className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-semibold text-slate-800">Editar cita</h1>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {error && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Paciente</label>
              <select name="pacienteId" value={form.pacienteId} onChange={handleChange} required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                <option value="" disabled>Selecciona un paciente</option>
                {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha</label>
                <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Hora</label>
                <input name="hora" type="time" value={form.hora} onChange={handleChange} required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Motivo</label>
              <input name="motivo" value={form.motivo} onChange={handleChange} required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={guardando}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <Link href="/appointments" className="flex-1 text-center border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}