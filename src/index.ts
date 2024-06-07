import { PacienteService } from './services/paciente';
import { DoctorService } from './services/doctor';
import { CitaService } from './services/cita';
import { RecetaService } from './services/receta';
import { ProductoServicioService } from './services/productos_servicios';
import { FacturaService } from './services/factura';
import { UsuarioService } from './services/usuario';
import { Usuario } from './interfaces/usuario.interface';


// Instanciar servicios
const pacienteService = new PacienteService();
const citaService = new CitaService();
const doctorService = new DoctorService(citaService);
const recetaService = new RecetaService();
const productoServicioService = new ProductoServicioService();
const facturaService = new FacturaService();
const userService = new UsuarioService();


//--------------------------- USUARIO ------------------------------//


//CREAR USUARIO
const nuevoUsuario: Usuario = {
    id_usuario: 0,
    nombre: 'Nombre Apellido',
    carnet: 1234567890,
    correo: 'usuario@clinica.com',
    clave: 'clave123',
    habilitado: true
};
//userService.crearUsuario(nuevoUsuario);
//console.log('Usuario creado: ', nuevoUsuario);



//EDITAR USUARIO
const idUsuarioEditar = 4;
const nuevosDatosUsuario = {
    nombre: 'Pedro Navajas',
    correo: 'nuevo@example.com',
    // Otros campos a editar...
};

// Llamamos al método editarUsuario para modificar el usuario
//userService.editarUsuario(idUsuarioEditar, nuevosDatosUsuario);




// LOGEAR USUARIO
/* const usuarioAutenticado = userService.autenticarUsuario('usuario@clinica.com', 'clave123');
if (usuarioAutenticado) {
    console.log('Usuario autenticado:', usuarioAutenticado);
} else {
    console.log('Credenciales incorrectas o usuario deshabilitado.');
} */



// DESHABILITAR 

//userService.deshabilitarUsuario(3);

// HABILITAR USUARIO

userService.habilitarUsuario(3);




// DESAUTENTICAR USUARIO
//userService.desautenticarUsuario;






