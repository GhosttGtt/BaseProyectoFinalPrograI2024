import * as fs from 'fs';
import { Paciente } from '../interfaces/paciente.interface';
import { Receta } from '../interfaces/receta.interface';

export class PacienteService {
  private pacientes: Paciente[] = [];

  constructor() {
    this.cargarPacientes();
  }

  private cargarPacientes(): void {
    try {
      const data = fs.readFileSync('./data/pacientes.json', 'utf-8');
      this.pacientes = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
    }
  }

  private guardarPacientes(): void {
    fs.writeFileSync('./data/pacientes.json', JSON.stringify(this.pacientes, null, 2));
  }
  private obtenerPacientesPorId(id: number): Paciente | undefined {
    return this.pacientes.find(pacientes => pacientes.id_paciente === id);
  }
  private obtenerUltimoIdPaciente(): number {
    if (this.pacientes.length === 0) {
        return 1; // Si no hay usuarios, devuelve 1 como primer ID
    }
    const ultimoUsuario = this.pacientes[this.pacientes.length - 1];
    return ultimoUsuario.id_paciente + 1; // Incrementa el ID del último usuario en 1
  }
  crearPaciente(paciente: Paciente): void {
    const id = this.obtenerUltimoIdPaciente(); // Obtener el próximo ID disponible
    paciente.id_paciente = id; // Asignar el ID al nuevo usuario
    this.pacientes.push(paciente);
    this.guardarPacientes();
    console.log(paciente);
  }
  pacienteExiste(id: number): boolean {
    return !!this.obtenerPacientePorId(id);
  }
  editarPaciente(id: number, nuevoPaciente: Partial<Paciente>): void {
    const pacienteExistente = this.obtenerPacientePorId(id);
      if (pacienteExistente) {
          const index = this.pacientes.findIndex(user => user.id_paciente === id);
          const usuarioActualizado = { ...this.pacientes[index], ...nuevoPaciente };
          this.pacientes[index] = usuarioActualizado;
          this.guardarPacientes();
          console.log(usuarioActualizado);
          console.log('Paciente editado correctamente.');
      } else {
          console.error('Error: El paciente no existe.');
      }
    }

  eliminarPaciente(id: number): void {
    const pacienteExistente = this.obtenerPacientePorId(id);
    if (pacienteExistente) {
      this.pacientes = this.pacientes.filter(paciente => paciente.id_paciente !== id);
      this.guardarPacientes();
      console.log("Paciente eliminado correctamente");
  } else {
      console.error('Error: El paciente no existe.');
  }
    
  }

  obtenerPacientePorId(id: number): Paciente | undefined {
    return this.pacientes.find(paciente => paciente.id_paciente === id);
  }

  obtenerEdadPaciente(id: number): {edad: number | undefined, nombre: string | undefined }{
    const paciente = this.obtenerPacientePorId(id);
    if (paciente) {
      const hoy = new Date();
      const fechaNacimiento = new Date(paciente.fecha_nacimiento);
      const edadMilisegundos = hoy.getTime() - fechaNacimiento.getTime();
      const edad = Math.floor(edadMilisegundos / (1000 * 60 * 60 * 24 * 365));
      return { nombre: paciente.nombre, edad};
    }
    return {edad: undefined, nombre: undefined};
  }

  obtenerTodosLosPacientes(): Paciente[] {
    return this.pacientes;
  }

  obtenerTotalPacientes(): number {
    return this.pacientes.length;
  }

  obtenerUltimasRecetasPaciente(id: number): Receta[] {
    const paciente = this.obtenerPacientePorId(id);
    if (paciente && paciente.recetas) {
        const recetasOrdenadas = paciente.recetas.sort((a, b) => b.id - a.id);
        return recetasOrdenadas.slice(0, 5);
    }
    return [];
}
}