import { Receta } from "./receta.interface"

export interface Paciente {
    id_paciente: number
    nombre: string
    fecha_nacimiento: Date
    direccion: string
    telefono: number
    alergias: string[]
    medicamentos_actuales: string[]
    condiciones_medicas: string[]
    recetas: Receta[];
}
