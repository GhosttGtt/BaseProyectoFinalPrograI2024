
import { Medicamento } from './medicamento.interface'

export interface Receta {
    id: number
    id_paciente: number
    id_doctor: number
    medicamentos: Medicamento[]
}

