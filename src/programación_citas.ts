
import { Cita } from './interfaces/cita.interface'

class CitaService {
  private citas: Cita[] = []

  programarCita(cita: Cita) {
    this.citas.push(cita)
    console.log(`Cita programada para ${cita.fecha_hora} con el doctor ${cita.id_doctor} y paciente ${cita.id_paciente}`)
  }

  cancelarCita(idCita: number) {
    const index = this.citas.findIndex((cita) => cita.id_paciente === idCita)
    if (index !== -1) {
      this.citas.splice(index, 1)
      console.log(`Cita cancelada con éxito`)
    } else {
      console.log(`No se encontró la cita con id ${idCita}`)
    }
  }

  reprogramarCita(idCita: number, nuevaFechaHora: Date) {
    const cita = this.citas.find((cita) => cita.id_paciente === idCita)
    if (cita) {
      cita.fecha_hora = nuevaFechaHora;
      console.log(`Cita reprogramada con éxito`)
    } else {
      console.log(`No se encontró la cita con id ${idCita}`)
    }
  }

  obtenerCitasDeDoctor(idDoctor: number): Cita[] {
    return this.citas.filter((cita) => cita.id_doctor === idDoctor)
  }

  obtenerCitasDePaciente(idPaciente: number): Cita[] {
    return this.citas.filter((cita) => cita.id_paciente === idPaciente)
  }

  obtenerCitasPorFecha(fecha: Date): Cita[] {
    return this.citas.filter((cita) => cita.fecha_hora.toDateString() === fecha.toDateString())
  }
}

export default CitaService