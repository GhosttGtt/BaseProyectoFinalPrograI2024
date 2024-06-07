import { programarCita } from "./programación_citas";

const newAppointment = programarCita({ 
    id_paciente: 1, 
    id_doctor: 1, 
    fecha_hora: new Date('2024-06-01T10:00:00') 
});

console.log('Cita programada:', newAppointment);

import { cancelarCita } from "./programación_citas";

  try {
    const cancelada = cancelarCita(2);
    if (cancelada) {
      console.log(`Cita cancelada con éxito: 1`);
    }
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error al cancelar la cita:', error.message);
    } else {
        console.error('Error desconocido al cancelar la cita');
    }
  }

  /*import { reprogramarCita } from "./programación_citas";

  try {
    const idCita = 1;

    const nuevaFechaHora = new Date('2024-07-15T13:00:00');
    const citaReprogramada = reprogramarCita(idCita, nuevaFechaHora);
    if (citaReprogramada) {
      console.log(`Cita reprogramada con éxito: ${citaReprogramada.id_cita}`);
    } else {
      console.log(`No se encontró la cita con ID ${idCita}`);
    }
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error al reprogramar la cita:', error.message);
    } else {
        console.error('Error desconocido al reprogramar la cita');
    }
  }*/

import { obtenerCitasPorDoctor } from "./programación_citas";

const id_doctor = 2;
const aPPOINTMENTS_FILE = 'citas.json';

try {
  const citas = obtenerCitasPorDoctor(id_doctor);
  console.log(`Citas del doctor ${id_doctor}:`);
  console.log(citas);
} catch (error) {
    if (error instanceof Error) {
        console.error('No existe el id del doctor:', error.message);
    } else {
        console.error('Error desconocido al buscar el id del doctor');
    }
  }


import { obtenerCitasPorPaciente } from "./programación_citas";

const id_paciente = 2; 
const APPOINTMENTS_fILE = 'citas.json'; 

try {
  const citas = obtenerCitasPorPaciente(id_paciente);
  console.log(`Citas del paciente ${id_paciente}:`);
  console.log(citas);
} catch (error) {
    if (error instanceof Error) {
        console.error('No existe el id del paciente:', error.message);
    } else {
        console.error('Error desconocido al buscar el id del paciente');
    }
  }

/*import { obtenerCitasPorFechaHora } from "./programación_citas";
const fecha_hora = '2024-07-15T19:00:00.000Z'; 
const APPOINTMENTS_FILE = 'citas.json'; 

try {
  const citas = obtenerCitasPorFechaHora(fecha_hora);
  console.log(`Citas para la fecha y hora ${fecha_hora}:`);
  console.log(citas);
} catch (error) {
    if (error instanceof Error) {
        console.error('No hay citas para la fecha y hora:', error.message);
    } else {
        console.error('Error desconocido al buscar citas por fecha y hora');
    }
}*/



import { crearDoctor } from "./Gestión_Horarios_Doctores";
import { Doctor } from "./interfaces/doctor.interface";
const doctor1: Omit<Doctor, 'id_doctor'> = {
  nombre: 'Dra. Pablo López ',
  especialidad: 'Odontología',
  horario: {
    dia: 'Martes',
    hora_inicio: '08:00',
    hora_fin: '12:00'
  }
};
const doctorCreado = crearDoctor(doctor1);
console.log(`Doctor creado: ${doctorCreado.nombre} con ID ${doctorCreado.id_doctor}`);



/*import { editarDoctor } from "./Gestión_Horarios_Doctores";
const id_doctor = 1;
const doctorToUpdate = {
  nombre: 'Juan Pérez',
  especialidad: 'Cardiología'
};
const horarioNuevo: Horario = {
  dia: 'Lunes',
  hora_inicio: '08:00',
  hora_fin: '17:00'
};

editarDoctor(id_doctor, doctorToUpdate, horarioNuevo)
 .then((doctorActualizado) => {
    if (doctorActualizado) {
      console.log(`Doctor actualizado con éxito: ${doctorActualizado.nombre}`);
    } else {
      console.log('No se encontró el doctor con el ID especificado');
    }
  })
 .catch((error) => {
    console.error('Error al actualizar el doctor:', error);
  });*/

import { eliminarDoctor } from "./Gestión_Horarios_Doctores";
const eliminado = eliminarDoctor(7);
console.log(`Doctor eliminado: ${eliminado? 'Sí' : 'No'}`);

import { obtenerDoctor } from "./Gestión_Horarios_Doctores";
const doctorObtenido = obtenerDoctor(6);
console.log(`Doctor obtenido: ${doctorObtenido?.nombre} con ID ${doctorObtenido?.id_doctor}`);

import { obtenerDoctoresDisponibles } from "./Gestión_Horarios_Doctores";
const fecha = 'Martes 08:00';
const doctoresDisponibles = obtenerDoctoresDisponibles(fecha);

if (doctoresDisponibles.length === 0) {
  console.log(`No hay doctores disponibles para ${fecha}.`);
} else {
  console.log(`Doctores disponibles para ${fecha}:`);
  doctoresDisponibles.forEach(doctor => console.log(`  - ${doctor.nombre} con ID ${doctor.id_doctor}`));
}

import { obtenerTodosLosDoctores } from "./Gestión_Horarios_Doctores";
const todosLosDoctores = obtenerTodosLosDoctores();
console.log(`Todos los doctores:`);
todosLosDoctores.forEach(doctor => console.log(`  - ${doctor.nombre} con ID ${doctor.id_doctor}`));

import { contarDoctores } from "./Gestión_Horarios_Doctores";
const cantidadDoctores = contarDoctores();
console.log(`Cantidad de doctores: ${cantidadDoctores}`);

import { validarDisponibilidadDoctor } from "./Gestión_Horarios_Doctores";
import { Horario } from "./interfaces/horario.interface";

/*const diasSemana = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo'
};

const diaSeleccionado = 2; 
const dia = diasSemana[diaSeleccionado];

const hora = '10:00'; 

const disponible = validarDisponibilidadDoctor(2, `${dia} ${hora}`);
console.log(`Doctor disponible para ${dia} ${hora}: ${disponible? 'Sí' : 'No'}`);*/