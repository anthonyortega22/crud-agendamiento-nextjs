import { pacientesService } from '@/app/service/paciente'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const paciente = await pacientesService.getById(params.id)
    return Response.json(paciente)
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : 'Error desconocido'
    return Response.json({ error: mensaje }, { status: 404 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const paciente = await pacientesService.update(params.id, body)
    return Response.json(paciente)
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : 'Error desconocido'
    return Response.json({ error: mensaje }, { status: 400 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pacientesService.delete(params.id)
    return Response.json({ ok: true })
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : 'Error desconocido'
    return Response.json({ error: mensaje }, { status: 404 })
  }
}