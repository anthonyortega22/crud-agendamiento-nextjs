/**
 * CAPA DE VISTA / API — Citas
 * Maneja HTTP. Delega toda lógica al servicio.
 */

import { citasService } from "@/service/citas";

export async function GET() {
  try {
    const citas = await citasService.getAll();
    return Response.json(citas);
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: mensaje }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cita = await citasService.create(body);
    return Response.json(cita, { status: 201 });
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: mensaje }, { status: 400 });
  }
}
