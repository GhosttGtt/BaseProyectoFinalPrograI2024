import * as fs from 'fs';
import { Usuario } from '../interfaces/usuario.interface';

export class UsuarioService {
  private usuarios: Usuario[] = [];
  private usuarioAutenticado: Usuario | null = null;

  constructor() {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    try {
      const data = fs.readFileSync('./data/usuarios.json', 'utf-8');
      this.usuarios = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  private guardarUsuarios(): void {
    fs.writeFileSync('./data/usuarios.json', JSON.stringify(this.usuarios, null, 2));
  }

  private obtenerUltimoIdUsuario(): number {
    if (this.usuarios.length === 0) {
        return 1; // Si no hay usuarios, devuelve 1 como primer ID
    }
    const ultimoUsuario = this.usuarios[this.usuarios.length - 1];
    return ultimoUsuario.id_usuario + 1; // Incrementa el ID del último usuario en 1
  }

  crearUsuario(usuario: Usuario): void {
    const id = this.obtenerUltimoIdUsuario();
    usuario.id_usuario = id;
    this.usuarios.push(usuario);
    this.guardarUsuarios();
  }

  private obtenerUsuarioPorId(id: number): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id_usuario === id);
  }


  
   editarUsuario(id: number, nuevoUsuarioData: Partial<Usuario>): void {
    const usuarioExistente = this.obtenerUsuarioPorId(id);
      if (usuarioExistente) {
          const index = this.usuarios.findIndex(user => user.id_usuario === id);
          const usuarioActualizado = { ...this.usuarios[index], ...nuevoUsuarioData };
          this.usuarios[index] = usuarioActualizado;
          this.guardarUsuarios();
          console.log('Usuario editado correctamente.');
      } else {
          console.error('Error: El usuario no existe.');
      }
    }


  deshabilitarUsuario(id: number): void {
    const usuarioExistente = this.obtenerUsuarioPorId(id);
    const usuario = this.usuarios.find(user => user.id_usuario === id);
    if (usuarioExistente) {
      if(usuario?.habilitado == false){
        console.log('El usuario ya se encuentra deshabilitado')
      }else if (usuario) {
        usuario.habilitado = false;
        this.guardarUsuarios();
        console.log('Usuario se deshabilito correctamente.');
      }    
  } else {
      console.error('Error: El usuario no existe.');
  }

    
  }

  habilitarUsuario(id: number): void {
      const usuario = this.usuarios.find(user => user.id_usuario === id);
      const usuarioExistente = this.obtenerUsuarioPorId(id);
      if (usuarioExistente) {
        if(usuario?.habilitado == true){
          console.log('El usuario ya se encuentra habilitado');
        }
        else if (usuario) {
          usuario.habilitado = true;
          this.guardarUsuarios();
          console.log('Usuario habilitado correctamente.');
        }      
    } else {
        console.error('Error: El usuario no existe.');
    }
  }

  eliminarUsuario(id: number): void {
    const index = this.usuarios.findIndex(user => user.id_usuario === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      this.guardarUsuarios();
    }
  }

  autenticarUsuario(correo: string, clave: string): Usuario | null {
    const usuario = this.usuarios.find(user => user.correo === correo && user.clave === clave);
    if (usuario && usuario.habilitado ) {
      this.usuarioAutenticado = usuario;
      return usuario;
    }
    return null;
  }

  desautenticarUsuario(): void {
    this.usuarioAutenticado = null;
  }
}