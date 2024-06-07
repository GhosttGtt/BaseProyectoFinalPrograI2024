import { Doctor } from "./interfaces/doctor.interface";
import { Horario } from "./interfaces/horario.interface";
import { readData, writeData } from './core/core';

const DOCTORS_FILE = 'doctores';

export function crearDoctor(doctor: Omit<Doctor, 'id_doctor'>): Doctor {
  const doctores = readData<Doctor>(DOCTORS_FILE);
  const id_doctor = doctores.length ? doctores[doctores.length - 1].id_doctor + 1 : 1;
  const newDoctor = { ...doctor, id_doctor };
  doctores.push(newDoctor);
  writeData(DOCTORS_FILE, doctores);
  return newDoctor;
}

export function editarDoctor(id_doctor: number, doctor: Partial<Doctor>, horarioNuevo: Horario): Promise<Doctor | null> {
    return new Promise((resolve, reject) => {
      const doctores = readData<Doctor>(DOCTORS_FILE);
      const index = doctores.findIndex(d => d.id_doctor === id_doctor);
      if (index!== -1) {
        const doctorToUpdate = doctores[index];
        Object.assign(doctorToUpdate, doctor);
        doctorToUpdate.horario = horarioNuevo; // Actualizamos el horario del doctor
        writeData(DOCTORS_FILE, doctores);
        resolve(doctorToUpdate);
      } else {
        reject(new Error(`No se encontró el doctor con el ID ${id_doctor}`));
      }
    });
  }

export function eliminarDoctor(id_doctor: number): boolean {
  const doctores = readData<Doctor>(DOCTORS_FILE);
  const index = doctores.findIndex(d => d.id_doctor === id_doctor);
  if (index !== -1) {
    doctores.splice(index, 1);
    writeData(DOCTORS_FILE, doctores);
    return true;
  }
  return false;
}

export function obtenerDoctor(id_doctor: number): Doctor | null {
  const doctores = readData<Doctor>(DOCTORS_FILE);
  return doctores.find(d => d.id_doctor === id_doctor) || null;
}

export function obtenerDoctoresDisponibles(fecha: string): Doctor[] {
  const doctores = readData<Doctor>(DOCTORS_FILE);
  return doctores.filter(d => {
    const horario = d.horario;
    const dia = fecha.split(' ')[0];
    const hora = fecha.split(' ')[1];
    return horario.dia === dia && horario.hora_inicio <= hora && horario.hora_fin >= hora;
  });
}

export function obtenerTodosLosDoctores(): Doctor[] {
  return readData<Doctor>(DOCTORS_FILE);
}

export function contarDoctores(): number {
  return readData<Doctor>(DOCTORS_FILE).length;
}

export function validarDisponibilidadDoctor(id_doctor: number, fecha: string): boolean {
  const doctor = obtenerDoctor(id_doctor);
  if (!doctor) return false;
  const horario = doctor.horario;
  const dia = fecha.split(' ')[0];
  const hora = fecha.split(' ')[1];
  return horario.dia === dia && horario.hora_inicio <= hora && horario.hora_fin >= hora;
}



