'use client'

import { Paciente } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [cargando, setCargando] = useState(true)

  const cargar = async () => {
    setCargando(true)
    const res = await fetch('/api/patients')
    const data = await res.json()
    setPacientes(data)
    setCargando(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true)
      const res = await fetch('/api/patients')
      const data = await res.json()
      setPacientes(data)
      setCargando(false)
    }
    fetchData()
  }, [])

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar paciente? Esta acción no se puede deshacer.')) return
    await fetch(`/api/patients/${id}`, { method: 'DELETE' })
    cargar()
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
            <h1 className="text-lg font-semibold text-slate-800">Pacientes</h1>
          </div>
          <Link href="/patients/new" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">
            + Nuevo paciente
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
        ) : pacientes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium mb-4">Sin pacientes registrados</p>
            <Link href="/patients/new" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors">
              Agregar paciente
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Teléfono</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nacimiento</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pacientes.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-semibold">
                          {p.nombre[0]}{p.apellido[0]}
                        </div>
                        <span className="font-medium text-slate-800">{p.nombre} {p.apellido}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.email}</td>
                    <td className="px-6 py-4 text-slate-600">{p.telefono}</td>
                    <td className="px-6 py-4 text-slate-600">{p.fechaNacimiento}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/patients/${p.id}/edit`} className="text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 transition-colors">
                          Editar
                        </Link>
                        <button onClick={() => eliminar(p.id)} className="text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1.5 transition-colors">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}