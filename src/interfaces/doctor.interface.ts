import { Horario } from './horario.interface'

export interface Doctor {
    id_doctor: number
    nombre: string
    especialidad: 'Odontología' | 'Cirujano Oral' | string
    horario: Horario[]
}
export { Horario }
