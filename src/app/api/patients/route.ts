/**
 * CAPA DE VISTA / API — Pacientes
 * Maneja HTTP. Delega toda lógica al servicio.
 */

import { pacientesService } from "@/service/paciente";

export async function GET() {
  try {
    const pacientes = await pacientesService.getAll();
    return Response.json(pacientes);
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: mensaje }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const paciente = await pacientesService.create(body);
    return Response.json(paciente, { status: 201 });
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: mensaje }, { status: 400 });
  }
}
