import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-3">MediCita</h1>
        <p className="text-slate-400 text-lg">Sistema de agendamiento médico</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold">Pacientes</h2>
              <p className="text-slate-400 text-sm">Gestión de pacientes</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/patients" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2.5 text-sm font-medium transition-colors">
              Ver pacientes
            </Link>
            <Link href="/patients/new" className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 hover:bg-slate-700/50 text-slate-300 px-4 py-2.5 text-sm font-medium transition-colors">
              Nuevo paciente
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-sm p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-semibold">Citas</h2>
              <p className="text-slate-400 text-sm">Agenda de citas</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/appointments" className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-4 py-2.5 text-sm font-medium transition-colors">
              Ver citas
            </Link>
            <Link href="/appointments/new" className="flex items-center justify-center gap-2 rounded-xl border border-slate-600 hover:bg-slate-700/50 text-slate-300 px-4 py-2.5 text-sm font-medium transition-colors">
              Nueva cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}