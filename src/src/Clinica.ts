import { Paciente } from '../interfaces/paciente.interface';
import * as fs from 'fs';
import * as path from 'path';

export class Clinica {
    private pacientes: Paciente[] = [];
    private dataFilePath: string = path.join('./data/pacientes.json');


    constructor() {
        this.loadPacientes();
    }

    private loadPacientes(): void {
        const data = fs.readFileSync(this.dataFilePath, 'utf8');
        this.pacientes = JSON.parse(data).map((paciente: any) => ({
            ...paciente,
            fecha_nacimiento: new Date(paciente.fecha_nacimiento)
        }));
    }

    private savePacientes(): void {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(this.pacientes, null, 2), 'utf8');
    }

    crearPaciente(paciente: Omit<Paciente, 'id_paciente'>): Paciente {
        const nuevoPaciente: Paciente = {
            ...paciente,
            id_paciente: this.pacientes.length ? this.pacientes[this.pacientes.length - 1].id_paciente + 1 : 1
        };
        this.pacientes.push(nuevoPaciente);
        this.savePacientes();
        return nuevoPaciente;
    }

    editarPaciente(id_paciente: number, datos: Partial<Paciente>): Paciente | undefined {
        const paciente = this.pacientes.find(p => p.id_paciente === id_paciente);
        if (paciente) {
            Object.assign(paciente, datos);
            this.savePacientes();
            return paciente;
        }
        return undefined;
    }

    eliminarPaciente(id_paciente: number): boolean {
        const index = this.pacientes.findIndex(p => p.id_paciente === id_paciente);
        if (index !== -1) {
            this.pacientes.splice(index, 1);
            this.savePacientes();
            return true;
        }
        return false;
    }

    obtenerPaciente(id_paciente: number): Paciente | undefined {
        return this.pacientes.find(p => p.id_paciente === id_paciente);
    }

    obtenerEdad(id_paciente: number): number | undefined {
        const paciente = this.obtenerPaciente(id_paciente);
        if (paciente) {
            const hoy = new Date();
            const nacimiento = new Date(paciente.fecha_nacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        }
        return undefined;
    }

    obtenerTodosLosPacientes(): Paciente[] {
        return this.pacientes;
    }

    conteoPacientes(): number {
        return this.pacientes.length;
    }
}