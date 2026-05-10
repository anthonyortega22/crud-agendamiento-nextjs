'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cita } from '@/app/types'

export default function CitasPage() {
    const [pacientes, setCitas] = useState<Cita[]>([])

    const cargar = async () => {
        const res = await fetch('/api/citas')
        const data = await res.json()
        setCitas(data)
    }

    useEffect(() => { cargar() }, [])

    const eliminar = async (id: string) => {
        if (!confirm('¿Eliminar paciente?')) return
        await fetch(`/api/citas/${id}`, { method: 'DELETE' })
        cargar()
    }

    return (
        <div>
            <h1>Pacientes</h1>
            <Link href="/pacientes/nuevo">Nuevo paciente</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(p => (
                        <tr key={p.id}>
                            <td>{p.nombre} {p.apellido}</td>
                            <td>{p.email}</td>
                            <td>{p.telefono}</td>
                            <td>
                                <Link href={`/pacientes/${p.id}/editar`}>Editar</Link>
                                <button onClick={() => eliminar(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}