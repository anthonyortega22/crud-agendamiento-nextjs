import { pacientesService } from "@/app/service/paciente"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const paciente = await pacientesService.getById(id)
    return Response.json(paciente)
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido"
    return Response.json({ error: mensaje }, { status: 404 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const paciente = await pacientesService.update(id, body)
    return Response.json(paciente)
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido"
    return Response.json({ error: mensaje }, { status: 400 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await pacientesService.delete(id)
    return Response.json({ ok: true })
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido"
    return Response.json({ error: mensaje }, { status: 404 })
  }
}