import { citasService } from "@/app/service/citas"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cita = await citasService.getById(id)
    return Response.json(cita)
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
    const cita = await citasService.update(id, body)
    return Response.json(cita)
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
    await citasService.delete(id)
    return Response.json({ ok: true })
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : "Error desconocido"
    return Response.json({ error: mensaje }, { status: 404 })
  }
}