import { Clinica } from './src/Clinica';

const clinica = new Clinica();

const paciente1 = clinica.crearPaciente({
    nombre: 'Nuevo Paciente',
    fecha_nacimiento: new Date('2000-01-01'),
    direccion: 'Dirección nueva',
    telefono: 123456789,
    alergias: ['Polvo'],
    medicamentos_actuales: ['Acetaminofen'],
    condiciones_medicas: ['Diabetes']
});

console.log('Paciente creado:', paciente1);

const pacienteObtenido = clinica.obtenerPaciente(paciente1.id_paciente);
console.log('Obtener paciente:', pacienteObtenido);

const edadPaciente = clinica.obtenerEdad(paciente1.id_paciente);
console.log('Edad del paciente:', edadPaciente);

const todosLosPacientes = clinica.obtenerTodosLosPacientes();
console.log('Todos los pacientes:', todosLosPacientes);

const conteo = clinica.conteoPacientes();
console.log('Conteo de pacientes:', conteo);

clinica.editarPaciente(paciente1.id_paciente, { direccion: 'Dirección editada' });
console.log('Paciente editado:', clinica.obtenerPaciente(paciente1.id_paciente));

clinica.eliminarPaciente(paciente1.id_paciente);
console.log('Paciente eliminado. Todos los pacientes:', clinica.obtenerTodosLosPacientes());