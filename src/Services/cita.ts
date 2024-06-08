// services/cita.service.ts
import * as fs from 'fs';
import { Cita } from '../Interfaces/cita.interface';

export class CitaService {
  private citas: Cita[] = [];

  constructor() {
    this.cargarCitas();
  }

  private cargarCitas(): void {
    try {
      const data = fs.readFileSync('./data/citas.json', 'utf-8');
      this.citas = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  }

  private guardarCitas(): void {
    fs.writeFileSync('./data/citas.json', JSON.stringify(this.citas, null, 2));
  }
  private obtenerUltimoIdCita(): number {
    if (this.citas.length === 0) {
        return 1; // Si no hay usuarios, devuelve 1 como primer ID
    }
    const ultimoidCita = this.citas[this.citas.length - 1];
    return ultimoidCita.id_cita + 1; // Incrementa el ID del último usuario en 1
  }

    programarCita(cita: Cita): void {
      const id = this.obtenerUltimoIdCita();
      cita.id_cita = id;
      this.citas.push(cita);
      this.guardarCitas();
    }

    // Otros métodos del servicio de citas...

    private obtenerCitaPorId(idCita: number): Cita | undefined {
        return this.citas.find(cita => cita.id_cita === idCita);
    }

  cancelarCita(idCita: number): boolean {
        const index = this.citas.findIndex(cita => cita.id_cita === idCita);
        if (index === -1) {
            return false; // Cita no encontrada
        }
        this.citas.splice(index, 1);
        this.guardarCitas();
        return true; // Cita cancelada con éxito
    }

  reprogramarCita(idCita: number, nuevaFechaHora: Date): boolean {
    const cita = this.citas.find(cita => cita.id_cita === idCita);
    if (cita) {
      cita.fecha_hora = nuevaFechaHora;
      this.guardarCitas();
      return true;
    } else {
      console.log(`No se encontró la cita con ID ${idCita}`);
      return false;
    }
  }

  obtenerCitasDeDoctor(idDoctor: number): Cita[] {
    return this.citas.filter(cita => cita.id_doctor === idDoctor);
  }

  obtenerCitasDePaciente(idPaciente: number): Cita[] {
    return this.citas.filter(cita => cita.id_paciente === idPaciente);
  }
  obtenerCitasPorDoctorYFecha(idDoctor: number, fecha: Date): Cita[] {
    return this.citas.filter(cita => {
      const citaFecha = new Date(cita.fecha_hora);
      return cita.id_doctor === idDoctor &&
             citaFecha.getFullYear() === fecha.getFullYear() &&
             citaFecha.getMonth() === fecha.getMonth() &&
             citaFecha.getDate() === fecha.getDate();
    });
  }
  

  obtenerCitasPorFecha(fecha: Date): Cita[] {
    const citasFecha = this.citas.filter(cita => {
      const citaDate = new Date(cita.fecha_hora);
      return citaDate.toDateString() === fecha.toDateString();
    });
    return citasFecha;
  }
  
  esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getFullYear() === fecha2.getFullYear() &&
           fecha1.getMonth() === fecha2.getMonth() &&
           fecha1.getDate() === fecha2.getDate();
  }
}
