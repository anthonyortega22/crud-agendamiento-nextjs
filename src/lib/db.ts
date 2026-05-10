/**
 * Base de datos en memoria.
 * Actúa como la "conexión" a la fuente de datos, igual que prisma.ts lo hacía
 * con SQLite. La capa de repositorios importa este módulo; las capas superiores
 * nunca lo tocan directamente.
 */

import { Cita, Paciente } from "../types";

// ----- Datos iniciales de ejemplo -----
const pacientesIniciales: Paciente[] = [
  {
    id: "pac-1",
    nombre: "Ana",
    apellido: "García",
    email: "ana.garcia@example.com",
    telefono: "3001234567",
    fechaNacimiento: "1990-05-15",
  },
  {
    id: "pac-2",
    nombre: "Carlos",
    apellido: "Pérez",
    email: "carlos.perez@example.com",
    telefono: "3109876543",
    fechaNacimiento: "1985-11-20",
  },
];

const citasIniciales: Cita[] = [
  {
    id: "cita-1",
    pacienteId: "pac-1",
    fecha: "2025-06-10",
    hora: "10:00",
    motivo: "Consulta general",
    estado: "pendiente",
  },
  {
    id: "cita-2",
    pacienteId: "pac-2",
    fecha: "2025-06-11",
    hora: "14:30",
    motivo: "Control mensual",
    estado: "confirmada",
  },
];

// ----- Singleton: una sola instancia vive mientras corre el servidor -----
const globalStore = globalThis as unknown as {
  _dbPacientes: Paciente[] | undefined;
  _dbCitas: Cita[] | undefined;
};

if (!globalStore._dbPacientes) {
  globalStore._dbPacientes = [...pacientesIniciales];
}
if (!globalStore._dbCitas) {
  globalStore._dbCitas = [...citasIniciales];
}

export const db = {
  pacientes: globalStore._dbPacientes as Paciente[],
  citas: globalStore._dbCitas as Cita[],
};
