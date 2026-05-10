'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Cita {
  id: string
  fecha: string
  hora: string
  motivo: string
  estado: string
  paciente: { nombre: string; apellido: string }
}

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([])

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch('/api/citas')
      const data = await res.json()
      setCitas(data)
    }
    cargar()
  }, [])

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar cita?')) return
    await fetch(`/api/citas/${id}`, { method: 'DELETE' })
    setCitas(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div>
      <h1>Citas</h1>
      <Link href="/citas/nueva">Nueva cita</Link>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map(c => (
            <tr key={c.id}>
              <td>{c.paciente.nombre} {c.paciente.apellido}</td>
              <td>{c.fecha}</td>
              <td>{c.hora}</td>
              <td>{c.motivo}</td>
              <td>{c.estado}</td>
              <td>
                <Link href={`/citas/${c.id}/editar`}>Editar</Link>
                <button onClick={() => eliminar(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}