import { Cita } from './interfaces/cita.interface';
import { readData, writeData } from './core/core';

const APPOINTMENTS_FILE = 'citas';

export function programarCita(cita: Omit<Cita, 'id_cita'>): Cita {
    const citas = readData<Cita>(APPOINTMENTS_FILE);
    const id_cita = citas.length ? citas[citas.length - 1].id_paciente + 1 : 1;
    const newCita = { ...cita, id_cita };
    citas.push(newCita);
    writeData(APPOINTMENTS_FILE, citas);
    return newCita;
}

export function cancelarCita(id_cita: number): boolean {
  const citas = readData<Cita>(APPOINTMENTS_FILE);
  const index = citas.findIndex(cita => cita.id_cita === id_cita);
  if (index!== -1) {
    citas.splice(index, 1);
    writeData(APPOINTMENTS_FILE, citas);
    return true;
  }
  return false;
}

export function reprogramarCita(id_cita: number, nuevaFechaHora: Date): Cita | null {
  const citas = readData<Cita>(APPOINTMENTS_FILE);
  const index = citas.findIndex(cita => cita.id_cita === id_cita);
  if (index !== -1) {
    const cita = citas[index];
    cita.fecha_hora = nuevaFechaHora;
    writeData(APPOINTMENTS_FILE, citas);
    return cita;
  }
  return null;
}

export function obtenerCitasPorDoctor(id_doctor: number): Cita[] {
  const citas = readData<Cita>(APPOINTMENTS_FILE);
  const doctorExists = citas.some(cita => cita.id_doctor === id_doctor);

  if (!doctorExists) {
    throw new Error(`El doctor con id ${id_doctor} no existe`);
  }
  return citas.filter(cita => cita.id_doctor === id_doctor);
}

export function obtenerCitasPorPaciente(id_paciente: number): Cita[] {
  const citas = readData<Cita>(APPOINTMENTS_FILE);
  const pacienteExists = citas.some(cita => cita.id_paciente === id_paciente);

  if (!pacienteExists) {
    throw new Error(`El paciente con id ${id_paciente} no existe`);
  }
  return citas.filter(cita => cita.id_paciente === id_paciente);
}

export function obtenerCitasPorFechaHora(fecha_hora: string): Cita[] {
  const citas = readData<Cita>(APPOINTMENTS_FILE);
  const citaExists = citas.some(cita => cita.fecha_hora .toDateString() === fecha_hora);

  if (!citaExists) {
    throw new Error(`No hay citas para la fecha y hora ${fecha_hora}`);
  }
  return citas.filter(cita => cita.fecha_hora .toDateString() === fecha_hora);
}