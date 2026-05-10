import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black px-4">
      <main className="w-full max-w-2xl">

        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            Sistema de agendamiento
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Gestiona pacientes y citas médicas
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-lg font-medium text-black dark:text-white mb-1">
              Pacientes
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Registra y administra la información de los pacientes.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/patients"
                className="flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Ver pacientes
              </Link>
              <Link
                href="/patients/new"
                className="flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Nuevo paciente
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-lg font-medium text-black dark:text-white mb-1">
              Citas
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Agenda y consulta las citas de los pacientes.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/appointments"
                className="flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Ver citas
              </Link>
              <Link
                href="/appointments/new"
                className="flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Nueva cita
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}