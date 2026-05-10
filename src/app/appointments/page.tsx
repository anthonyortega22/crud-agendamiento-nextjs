'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Cita {
  id: string
  fecha: string
  hora: string
  motivo: string
  estado: string
  paciente: { nombre: string; apellido: string }
}

const estadoConfig: Record<string, { label: string; className: string }> = {
  pendiente:  { label: 'Pendiente',  className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  confirmada: { label: 'Confirmada', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  cancelada:  { label: 'Cancelada',  className: 'bg-red-50 text-red-700 border border-red-200' },
}

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    (async () => {
      setCargando(true)
      const res = await fetch('/api/appointments')
      const data = await res.json()
      setCitas(data)
      setCargando(false)
    })()
  }, [])

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar cita?')) return
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
    setCitas(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-lg font-semibold text-slate-800">Citas</h1>
          </div>
          <Link href="/appointments/new" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">
            + Nueva cita
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {cargando ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Cargando...
          </div>
        ) : citas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium mb-4">Sin citas registradas</p>
            <Link href="/appointments/new" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors">
              Agendar cita
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Paciente</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hora</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Motivo</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {citas.map(c => {
                  const estado = estadoConfig[c.estado] ?? { label: c.estado, className: 'bg-slate-100 text-slate-600' }
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">
                            {c.paciente.nombre[0]}{c.paciente.apellido[0]}
                          </div>
                          <span className="font-medium text-slate-800">{c.paciente.nombre} {c.paciente.apellido}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{c.fecha}</td>
                      <td className="px-6 py-4 text-slate-600">{c.hora}</td>
                      <td className="px-6 py-4 text-slate-600 max-w-45 truncate">{c.motivo}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estado.className}`}>
                          {estado.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/appointments/${c.id}/edit`} className="text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 transition-colors">
                            Editar
                          </Link>
                          <button onClick={() => eliminar(c.id)} className="text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1.5 transition-colors">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}