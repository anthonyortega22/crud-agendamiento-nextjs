'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Paciente } from '@/app/types'

export default function PacientesPage() {
    const [pacientes, setPacientes] = useState<Paciente[]>([])

    const cargar = async () => {
        const res = await fetch('/api/pacientes')
        const data = await res.json()
        setPacientes(data)
    }

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/pacientes')
            const data = await res.json()
            setPacientes(data)
        })()
    }, [])

    const eliminar = async (id: string) => {
        if (!confirm('¿Eliminar paciente?')) return

        await fetch(`/api/pacientes/${id}`, {
            method: 'DELETE'
        })

        cargar()
    }

    return (
        <div>
            <h1>Pacientes</h1>

            <Link href="/pacientes/nuevo">
                Nuevo paciente
            </Link>

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
                    {pacientes.map((p) => (
                        <tr key={p.id}>
                            <td>{p.nombre} {p.apellido}</td>
                            <td>{p.email}</td>
                            <td>{p.telefono}</td>

                            <td>
                                <Link href={`/pacientes/${p.id}/editar`}>
                                    Editar
                                </Link>

                                <button onClick={() => eliminar(p.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}