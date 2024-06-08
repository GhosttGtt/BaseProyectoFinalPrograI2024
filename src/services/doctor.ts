import * as fs from 'fs';
import { Doctor, Horario } from '../interfaces/doctor.interface';
import { CitaService } from './cita';

export class DoctorService {
  private doctores: Doctor[] = [];
  private citaService: CitaService;

  constructor(citaService: CitaService) {
    this.citaService = citaService;
    this.cargarDoctores();
  }

  private cargarDoctores(): void {
    try {
      const data = fs.readFileSync('./data/doctores.json', 'utf-8');
      this.doctores = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los doctores:', error);
    }
  }

  private guardarDoctores(): void {
    fs.writeFileSync('./data/doctores.json', JSON.stringify(this.doctores, null, 2));
  }

  crearDoctor(doctor: Omit<Doctor, 'id_doctor'>): Doctor {
    const nuevoId = this.doctores.length > 0 ? this.doctores[this.doctores.length - 1].id_doctor + 1 : 1;
    const nuevoDoctor: Doctor = { id_doctor: nuevoId, ...doctor };
    this.doctores.push(nuevoDoctor);
    this.guardarDoctores();
    return nuevoDoctor;
  }

  editarDoctor(id: number, nuevoDoctor: Omit<Doctor, 'id_doctor'>): void {
    const index = this.doctores.findIndex(doctor => doctor.id_doctor === id);
    if (index !== -1) {
      this.doctores[index] = { id_doctor: id, ...nuevoDoctor };
      this.guardarDoctores();
    }
  }

  eliminarDoctor(id: number): void {
    this.doctores = this.doctores.filter(doctor => doctor.id_doctor !== id);
    this.guardarDoctores();
  }

  obtenerDoctorPorId(id: number): Doctor | undefined {
    return this.doctores.find(doctor => doctor.id_doctor === id);
  }

  obtenerDoctoresDisponiblesParaFecha(fecha: Date): Doctor[] {
    const doctoresDisponibles: Doctor[] = [];

    for (const doctor of this.doctores) {
      if (this.doctorEstaDisponibleEnFecha(doctor, fecha)) {
        doctoresDisponibles.push(doctor);
      }
    }

    return doctoresDisponibles;
  }

  private doctorEstaDisponibleEnFecha(doctor: Doctor, fecha: Date): boolean {
    const citas = this.citaService.obtenerCitasPorDoctorYFecha(doctor.id_doctor, fecha);
    if (citas.length > 0) {
      return false; // El doctor tiene citas programadas para esa fecha
    }

    const diaSemana = fecha.getDay();
    const horario = doctor.horario.find(horario => horario.dia === this.obtenerNombreDia(diaSemana));
    if (!horario) {
      return false; // El doctor no trabaja ese día
    }

    const horaInicio = new Date(`${fecha.toDateString()} ${horario.hora_inicio}`);
    const horaFin = new Date(`${fecha.toDateString()} ${horario.hora_fin}`);
    if (fecha < horaInicio || fecha > horaFin) {
      return false; // La fecha está fuera del horario de trabajo del doctor
    }

    return true;
  }

  private obtenerNombreDia(dia: number): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[dia];
  }


  obtenerTodosLosDoctores(): Doctor[] {
    return this.doctores;
  }

  obtenerTotalDoctores(): number {
    return this.doctores.length;
  }

  validarDisponibilidadDoctorParaFecha(idDoctor: number, fecha: Date): boolean {
    const doctor = this.obtenerDoctorPorId(idDoctor);
    if (doctor) {
      return this.doctorEstaDisponibleEnFecha(doctor, fecha);
    }
    return false;
  }
}
