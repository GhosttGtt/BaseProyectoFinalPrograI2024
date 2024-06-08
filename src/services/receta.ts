import * as fs from 'fs';
import { Receta } from '../interfaces/receta.interface';


export class RecetaService {
    recetas: Receta[] = [];

    constructor() {
        this.cargarRecetas();
    }

    private cargarRecetas(): void {
        try {
            const data = fs.readFileSync('./data/recetas.json', 'utf-8');
            this.recetas = JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar las recetas:', error);
        }
    }

    private guardarRecetas(): void {
        fs.writeFileSync('./data/recetas.json', JSON.stringify(this.recetas, null, 2));
    }

    crearReceta(receta: Omit<Receta, 'id'>): Receta {
      const nuevoId = this.recetas.length > 0 ? this.recetas[this.recetas.length - 1].id + 1 : 1;
      console.log(nuevoId);
      const nuevaReceta: Receta = {id: nuevoId , ...receta, };
      this.recetas.push(nuevaReceta);
      this.guardarRecetas();
      console.log('Receta creada', nuevaReceta);
      return nuevaReceta;

    }

    editarReceta(idReceta: number, nuevaReceta: Receta): void {
        const index = this.recetas.findIndex(receta => receta.id === idReceta);
        if (index !== -1) {
            this.recetas[index] = nuevaReceta;
            this.guardarRecetas();
        }
    }

    eliminarReceta(idReceta: number): void {
        this.recetas = this.recetas.filter(receta => receta.id !== idReceta);
        this.guardarRecetas();
    }

    obtenerRecetasDePaciente(idPaciente: number): Receta[] {
        return this.recetas.filter(receta => receta.id_paciente === idPaciente);
    }

    obtenerMedicamentosDeReceta(idReceta: number): string[] {
        const receta = this.recetas.find(receta => receta.id === idReceta);
        return receta ? receta.medicamentos.map(medicamento => medicamento.nombre) : [];
    }
}
