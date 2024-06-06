import { Doctor } from './interfaces/doctor.interface'
import { Horario } from './interfaces/horario.interface'
 
export class DoctorService {

  private doctores: Doctor[] = []

  crearDoctor(doctor: Doctor) {
    this.doctores.push(doctor)
    console.log(`Doctor creado con éxito: ${doctor.nombre}`)
  }

  editarDoctor(idDoctor: number, doctor: Doctor) {
    const index = this.doctores.findIndex((d) => d.id_doctor === idDoctor)
    if (index!== -1) {
      this.doctores[index] = doctor
      console.log(`Doctor editado con éxito: ${doctor.nombre}`)
    } else {
      console.log(`No se encontró el doctor con id ${idDoctor}`)
    }
  }

  eliminarDoctor(idDoctor: number) {
    const index = this.doctores.findIndex((d) => d.id_doctor === idDoctor)
    if (index!== -1) {
      this.doctores.splice(index, 1)
      console.log(`Doctor eliminado con éxito`)
    } else {
      console.log(`No se encontró el doctor con id ${idDoctor}`)
    }
  }

  obtenerDoctor(idDoctor: number): Doctor | undefined {
    return this.doctores.find((d) => d.id_doctor === idDoctor)
  }

  obtenerDoctoresDisponibles(fecha: Date): Doctor[] {
    return this.doctores.filter((d) => this.esDiaDeTrabajo(d, fecha) && this.esHoraDeTrabajo(d, fecha))
  }

  obtenerTodosLosDoctores(): Doctor[] {
    return this.doctores
  }

  contarDoctores(): number {
    return this.doctores.length
  }

  validarDisponibilidad(idDoctor: number, fecha: Date): boolean {
    const doctor = this.obtenerDoctor(idDoctor)
    if (doctor) {
      return this.esDiaDeTrabajo(doctor, fecha) && this.esHoraDeTrabajo(doctor, fecha)
    } else {
      return false
    }
  }

  private esDiaDeTrabajo(doctor: Doctor, fecha: Date): boolean {
    const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'long' })
    return doctor.horario.dia === diaSemana
  }

  private esHoraDeTrabajo(doctor: Doctor, fecha: Date): boolean {
    const hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    return hora >= doctor.horario.hora_inicio && hora <= doctor.horario.hora_fin
  }
}