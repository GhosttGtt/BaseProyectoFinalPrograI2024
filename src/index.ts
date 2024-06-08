import { PacienteService } from './services/paciente';
import { DoctorService } from './services/doctor';
import { CitaService } from './services/cita';
import { RecetaService } from './services/receta';
import { ProductoServicioService } from './services/productos_servicios';
import { FacturaService } from './services/factura';
import { UsuarioService } from './services/usuario';
import { Usuario } from './interfaces/usuario.interface';
import { Receta } from './interfaces/receta.interface';
import { Cita } from './interfaces/cita.interface';
import { Factura } from './interfaces/factura.interface';
import { Doctor, Horario } from './interfaces/doctor.interface';


// Instanciar servicios
const pacienteService = new PacienteService();
const citaService = new CitaService();
const doctorService = new DoctorService(citaService);
const recetaService = new RecetaService();
const productoServicioService = new ProductoServicioService();
const facturaService = new FacturaService(productoServicioService);
const userService = new UsuarioService();


//--------------------------- USUARIO ------------------------------//


// [ CREAR USUARIO ] 
const nuevoUsuario: Usuario = {
    id_usuario: 0,
    nombre: 'Cheli',
    carnet: 123456792,
    correo: 'Cheli@clinica.com',
    clave: 'clave123',
    habilitado: true
};
// userService.crearUsuario(nuevoUsuario);
// console.log('Usuario creado: ', nuevoUsuario);



// [ EDITAR USUARIO ]


function editarUsuario(id:number, nombre:string, correo: string){
    const idUsuarioEditar = id;
    const nuevosDatosUsuario = {
        nombre: nombre,
        correo: correo,
    };
    userService.editarUsuario(idUsuarioEditar, nuevosDatosUsuario);
}

//editarUsuario(3, "David", "David@email.com");




// [ LOGEAR USUARIO ]
/* const usuarioAutenticado = userService.autenticarUsuario('David@email.com', 'clave123');
if (usuarioAutenticado) {
    console.log('Usuario autenticado:', usuarioAutenticado);
} else {
    console.log('Credenciales incorrectas o usuario deshabilitado.');
} */

// [ DESHABILITAR ]

// userService.deshabilitarUsuario(3);

// [ HABILITAR USUARIO ]

//userService.habilitarUsuario(3);


// [ DESAUTENTICAR USUARIO ]
/* userService.desautenticarUsuario;
console.log('Usuario desautenticado')*/


// [  Eliminar usuario ]

//userService.eliminarUsuario(3);




//-------------------------- PACIENTES ----------------------------//


//  [ REGISTRO DE PACIENTES ]

const nuevoPaciente = {
    id_paciente: 0,
    nombre: 'Juanita Pérez',
    fecha_nacimiento: new Date('1991-05-15'),
    direccion: 'Calle Principal 123-4',
    telefono: 12345678,
    alergias: ['Aspirina'],
    medicamentos_actuales: ['Paracetamol'],
    condiciones_medicas: ['Hipertensión'],
    recetas:[]
};
//pacienteService.crearPaciente(nuevoPaciente);




//  [ EDITAR PACIENTE ]
const idPacienteEditar = 3;
const nuevosDatosPaciente = {
    nombre: "Luisa Marroquin",
    fecha_nacimiento: new Date('1989-10-20'),
    direccion: "Villa Linda, Guatemala",
    telefono: 98765432,
    alergias: ['Tarea'],
    medicamentos_actuales: ['Paracetamol'],
    condiciones_medicas: ['Hipertensión']
};
//pacienteService.editarPaciente(idPacienteEditar, nuevosDatosPaciente);



//  [ ELIMINAR PACIENTE ]
//pacienteService.eliminarPaciente(3);





//  [ OBTENER PACIENTE POR ID ]

function buscarPacientePorId(id:number ){
    if (pacienteService.pacienteExiste(id)) {
        console.log(pacienteService.obtenerPacientePorId(id));
    } else {
        console.log('El paciente no existe.');
    }
}
//buscarPacientePorId(2)





//  [  OBTENER LA EDAD DE UN PACIENTE  ]

//console.log(pacienteService.obtenerEdadPaciente(2))






// [  OBTENER TODOS LOS PACIENTES  ]

//console.log(pacienteService.obtenerTodosLosPacientes());







//  [  OBTENER CONTEO DE PACIENTES  ]

//console.log("Total de pacientes: ", pacienteService.obtenerTodosLosPacientes().length);







// [  OBTENER LAS ULTIMAS 5 RECETAS ]



function obtenerRecetas(id:number){
    const ultimasRecetas: Receta[] = pacienteService.obtenerUltimasRecetasPaciente(id);
    console.log('Las últimas 5 recetas del paciente son:');
    ultimasRecetas.forEach(receta => {
        console.log(`ID: ${receta.id}, Paciente: ${receta.id_paciente}, Doctor: ${receta.id_doctor}`);
        console.log('Medicamentos:');
        receta.medicamentos.forEach(medicamento => {
            console.log(`- ${medicamento.nombre}, Dosis: ${medicamento.dosis}, Frecuencia: cada ${medicamento.frecuencia_horas} horas, Duración: ${medicamento.duracion_dias} días`);
        });
        console.log('-------------------------');
    });
}

//obtenerRecetas(1)






//-------------------------- PROGRAMACIÓN DE CITAS -------------------//




//   [  PROGRAMAR CITAS  ]


function nuevaCita(idPaciente: number, idDoctor: number){
    
    const nuevaCita: Cita = {
        id_cita: 1,
        fecha_hora: new Date('2024-06-10T10:00:00'), 
        id_paciente: idPaciente, 
        id_doctor: idDoctor
    };
    const citaCreada = citaService.programarCita(nuevaCita);
    console.log('Cita programada con éxito:', nuevaCita);
}
    //nuevaCita(1, 1);






//  [  CANCELAR CITA  ]

function cancelarCita(id: number){
    const citaCancelada = citaService.cancelarCita(id);
if (citaCancelada) {
    console.log(`Cita con ID ${id} cancelada con éxito.`);
} else {
    console.log(`Error: No se encontró una cita con ID ${id}.`);
}
}
//cancelarCita(11);






// [  REPROGRAMAR CITA  ]


function reprogramarCita( id: number ){
    const nuevaFechaHora = new Date('2024-05-29T10:00:00');
    const citaReprogramada = citaService.reprogramarCita(id, nuevaFechaHora);
    if (citaReprogramada) {
    console.log(`La cita con ID ${id} ha sido reprogramada para ${nuevaFechaHora}`);
    } else {
    console.log(`No se encontró la cita con ID ${id}`);
    }
}

//reprogramarCita(10)





// [  OBTENER CITAS DE UN DOCTOR  ]

//console.log(citaService.obtenerCitasDeDoctor(1));






// [  OBTENER CITAS DE UN PACIENTE  ]

//console.log(citaService.obtenerCitasDePaciente(1));




// [  OBTENER CITAS POR FECHA  ]


function obtenerCitasPorFecha(fecha: Date){
    const citasFecha = citaService.obtenerCitasPorFecha(fecha);
    console.log('Citas del', fecha.toDateString(), ':', citasFecha);
}

//obtenerCitasPorFecha(new Date('2024-08-23'))





// --------------------GESTION DE DOCTORES Y HORARIOS--------------------//


// [ CREAR DOCTOR  ]
function crearDoctor(){
    const nuevoDoctor: Omit<Doctor, 'id_doctor'> = {
        nombre: 'Dr. David Asencio',
        especialidad: 'Odontología',
        horario: [
          { dia: 'Lunes', hora_inicio: '08:00', hora_fin: '17:00' },
          { dia: 'Martes', hora_inicio: '08:00', hora_fin: '17:00' },
          { dia: 'Miercoles', hora_inicio: '08:00', hora_fin: '17:00' },
          { dia: 'Viernes', hora_inicio: '08:00', hora_fin: '17:00' }
        ]
      };
      const doctorCreado = doctorService.crearDoctor(nuevoDoctor);
      console.log('Doctor creado:', doctorCreado);
}
//crearDoctor();

  




  //   [  EDITAR DOCTOR  ]
  function editarDoctor(id:number){
    const doctorEditado: Omit<Doctor, 'id_doctor'> = {
        nombre: 'Dr. David Escobar',
        especialidad: 'Ortodoncia',
        horario: [
          { dia: 'Miércoles', hora_inicio: '09:00', hora_fin: '18:00' },
          { dia: 'Jueves', hora_inicio: '09:00', hora_fin: '18:00' }
        ]
      };
      doctorService.editarDoctor(id, doctorEditado);
      console.log('Doctor editado:', doctorService.obtenerDoctorPorId(id));
  }

 //editarDoctor(5);
  




  


//   [ ELIMINAR DOCTOR  ]
 function eliminardoctor(id: number){
    doctorService.eliminarDoctor(id);
    console.log('Doctor eliminado:', doctorService.obtenerDoctorPorId(id));
 }
 //eliminardoctor(5);






  
  // [  OBTENER UN DOCTOR POR ID ]
  function obtenerDoctorId(id:number){
    const doctor = doctorService.obtenerDoctorPorId(id);
    console.log('Doctor obtenido por ID:', doctor);
  }
  //obtenerDoctorId(4)

  
  



//   [  OBTENER DOCTORES DISPONIBLES POR FECHAS ESPECIFICAS  ]


function obtenerDoctoresPorFecha(fecha: Date){
    const doctoresDisponibles = doctorService.obtenerDoctoresDisponiblesParaFecha(fecha);
    console.log('Doctores disponibles:', doctoresDisponibles);
}

//obtenerDoctoresPorFecha( new Date('2024-08-22T13:00:00'));







//  [  OBTENER TODOS LOS DOCTORES  ]




function todosLosDoctores(){
    const todosLosDoctores = doctorService.obtenerTodosLosDoctores();
    console.log('Todos los doctores:', todosLosDoctores);
}
//todosLosDoctores();




function contarDoctores(){
    const todosLosDoctores = doctorService.obtenerTodosLosDoctores();
    console.log('Doctores registrados:', todosLosDoctores.length);
}
//contarDoctores();







//    [VALIDAR DISPONIBILIDAD DE UN DOCTOR POR FECHA ESPECIFICA   ]





function validarFechaDisponible(id: number, fecha: Date){
    const doctor = doctorService.obtenerDoctorPorId(id);
    console.log("-----------------------------------------")
    console.log('Doctor: ',doctor ? doctor.nombre: 'Anonimo');
    console.log('Fecha sollicitada: '+  fecha);
    const disponibilidad = doctorService.validarDisponibilidadDoctorParaFecha(id, fecha);
    console.log(disponibilidad ? 'Fecha dispobile': 'Fecha no disponible' ),
    console.log('----------------------------------------');
}

//validarFechaDisponible(4, new Date('2024-08-20T10:00:00'));

//--------------------- REGISTRO DE RECETAS ------------------------------//



// [  CREAR RECETAS   ]

function crearReceta(){
    const nuevaReceta = recetaService.crearReceta({
        id_paciente: 1,
        id_doctor: 1,
        medicamentos: [
            { id: 1, nombre: 'Ibuprofeno', dosis: '400mg', frecuencia_horas: 6, duracion_dias: 5 },
            { id: 2, nombre: 'Amoxicilina', dosis: '500mg', frecuencia_horas: 8, duracion_dias: 7 }
        ]
    });
} 

//crearReceta();





//    [  Editar una receta existente   ]

function editarReceta(id:number){
    const recetaEditada: Receta = {
        id: id,
        id_paciente: 2,
        id_doctor: 2,
        medicamentos: [
            { id: 3, nombre: 'Paracetamol', dosis: '200mg', frecuencia_horas: 4, duracion_dias: 5 }
        ]
    };
    recetaService.editarReceta(id, recetaEditada);
}
editarReceta(3);




//   [   Eliminar una receta   ]

function eliminarReceta(id: number){
    recetaService.eliminarReceta(id);
}
//eliminarReceta(3);




//   [ Obtener recetas de paciente  ]

function obtenerMedicamentosDeRecetasDePaciente(idPaciente: number) {
    console.log('Recetas del paciente:');
    const recetasDelPaciente: Receta[] = recetaService.obtenerRecetasDePaciente(idPaciente);
    const paciente = pacienteService.obtenerPacientePorId(idPaciente);
    console.log(paciente ? paciente.nombre: 'Anonimo');
    
    for (const receta of recetasDelPaciente) {
        const doctor = doctorService.obtenerDoctorPorId(receta.id_doctor);
        console.log('  Receta:', receta.id);
        console.log('  Doctor:', doctor ? doctor.nombre : 'Desconocido');
        console.log('  Especialidad:', doctor ? doctor.especialidad: 'Ninguna');
        console.log('  Medicamentos:');
        for (const medicamento of receta.medicamentos) {
            console.log('    -', medicamento.nombre);
        }
        console.log();
    }
}
//obtenerMedicamentosDeRecetasDePaciente(1);



//     [ OBTNER MEDICAMENTOS DE UNA RECETA  ]
function obtenerMedicamentosDeReceta(id:number){
    const medicamentosReceta = recetaService.obtenerMedicamentosDeReceta(id);
    console.log('Medicamentos de la receta:', medicamentosReceta);
}

//obtenerMedicamentosDeReceta(1);






// ---------------- ADMINISTRACIION DE PRODUCTOS Y SERVICIOS-------------//



//  [  CREAR PRODUCTO / SERVICIO  ]


  
function crearProductoServicio(){
    const nuevoProducto = productoServicioService.crearProductoServicio({
        tipo: 'Producto',
        nombre: 'Pasta de dientes',
        precio: 12
    });
    console.log('Nuevo producto/servicio creado:', nuevoProducto);
}   

//crearProductoServicio();



  // [  EDITAR PRODUCTO / SERVICIO  ]

  function editarProductoServicio(id: number){
    const idProductoAEditar = id;
    productoServicioService.editarProductoServicio(idProductoAEditar, {
    precio: 15
    });
  }
  
  //editarProductoServicio(4)






  //   [  ELIMINIAR PRODUCTO / SERVICIO ]

function elimarProductoServicio(id:number){
    productoServicioService.eliminarProductoServicio(id);
    console.log('Producto/Servicio eliminado:', productoServicioService.obtenerProductoServicioPorId(id));
  
}

//elimarProductoServicio(4);
  







  // [  OBTENER PRODUCTO / SERVICIO POR ID ]

  function obtenerProductoServicio(id:number){
    const productoServicioPorId = productoServicioService.obtenerProductoServicioPorId(id);
  }

  //obtenerProductoServicio(2)
  






  //   [  OBTENER TODOS LOS PRODUCTOS / SERVICIOS  ]

  function obtenerTodosLosProductosServicios(){
    const productos = productoServicioService.obtenerProductosServiciosPorTipo('Producto');
    console.log('Productos:', productos);
    
    const servicios = productoServicioService.obtenerProductosServiciosPorTipo('Servicio');
    console.log('Servicios:', servicios);
  }

//obtenerTodosLosProductosServicios();




//-------------------------FACTURACIÓN------------------------------------//




// [  CREAR FACTURA  ]

function crearFactura(){
    const nuevaFactura: Factura = {
        id_factura: 4,
        fecha_hora: new Date(),
        id_paciente: 1,
        id_doctor: 1,
        servicios_consumidos: [1, 2], // IDs de los servicios consumidos
        total: 200 // Total de la factura
      };
      
     facturaService.crearFactura(nuevaFactura);
     console.log('Nueva factura creada:', nuevaFactura);
    
}

//crearFactura();


// [  EDITAR FACTURA  ]



function editarFactura(){
    const idFacturaEditar = 4;
    const nuevosServicios = [2, 1]; 
    const nuevoTotal = 210; 
    facturaService.editarFactura(idFacturaEditar, nuevosServicios, nuevoTotal);
    console.log('Factura editada:', facturaService.obtenerFacturaPorId(idFacturaEditar));
}

//editarFactura();




// [   ELIMINAR FACTURA ]



function elimnarFactura(idFacturaEliminar:number){
    facturaService.eliminarFactura(idFacturaEliminar);
    console.log('Factura eliminada:', idFacturaEliminar);
}
//elimnarFactura(4)







//  [ OBTENER FACTURA POR CLIENTE ] 


function obtenerFacturaPorCliente(idCliente:number){
const facturasCliente = facturaService.obtenerFacturasPorCliente(idCliente);
console.log('Facturas del cliente:', facturasCliente);
}

//obtenerFacturaPorCliente(1);








//  [   OBTENER PRODUCTO POR FACTURA  ]


function obtenerProductoFactura(idFactura: number){
    const productosFactura = facturaService.obtenerProductosPorFactura(idFactura);
    console.log('Productos de la factura:', productosFactura);
}
//obtenerProductoFactura(2);






//   [ OBTENER FACTURA POR FECHA ESPECIFICA ]

function obtenerFacturaPorFecha(fechaEspecifica: Date){
    const facturasFecha = facturaService.obtenerFacturasPorFecha(fechaEspecifica);
    console.log('Facturas de la fecha:', facturasFecha);
}
//obtenerCitasPorFecha( new Date('2024-06-07'));
 






// [ OBTENER TOTAL DE FACTURACIÓN POR MES ]

function facturacionMes(mes:number, anio: number){
    const totalFacturacion = facturaService.obtenerTotalFacturacionPorMes(mes, anio);
    console.log(`Total de facturación para ${mes}/${anio}:`, totalFacturacion);
}

facturacionMes(7, 2024);