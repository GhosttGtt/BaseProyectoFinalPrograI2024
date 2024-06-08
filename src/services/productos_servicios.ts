// services/producto-servicio.service.ts
import * as fs from 'fs';
import { ProductoServicio } from '../interfaces/producto_servicio.interface';

export class ProductoServicioService {
  private productosServicios: ProductoServicio[] = [];

  constructor() {
    this.cargarProductosServicios();
  }

  private cargarProductosServicios(): void {
    try {
      const data = fs.readFileSync('./data/productos_servicios.json', 'utf-8');
      this.productosServicios = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los productos/servicios:', error);
    }
  }

  private guardarProductosServicios(): void {
    fs.writeFileSync('./data/productos_servicios.json', JSON.stringify(this.productosServicios, null, 2));
  }

  crearProductoServicio(productoServicio: Omit<ProductoServicio, 'id_producto_servicio'>): ProductoServicio {
    const nuevoId = this.productosServicios.length > 0 ? this.productosServicios[this.productosServicios.length - 1].id_producto_servicio + 1 : 1;
    const nuevoProductoServicio: ProductoServicio = {id_producto_servicio: nuevoId , ...productoServicio, };
    this.productosServicios.push(nuevoProductoServicio);
    this.guardarProductosServicios();
    return nuevoProductoServicio;
  }

  editarProductoServicio(id: number, productoServicioActualizado: Partial<ProductoServicio>): void {
    
    const index = this.productosServicios.findIndex(productoServicio => productoServicio.id_producto_servicio === id);
    if (index !== -1) {
      this.productosServicios[index] = { ...this.productosServicios[index], ...productoServicioActualizado };
      this.guardarProductosServicios();
      console.log(`Producto/Servicio con ID ${id} editado correctamente.`);
    } else {
      console.error(`Producto/Servicio con ID ${id} no encontrado.`);
    }
  }

  eliminarProductoServicio(id: number): void {
    this.productosServicios = this.productosServicios.filter(productoServicio => productoServicio.id_producto_servicio !== id);
    this.guardarProductosServicios();
  }

  obtenerProductoServicioPorId(id: number): ProductoServicio | undefined {
    const productoServicio = this.productosServicios.find(productoServicio => productoServicio.id_producto_servicio === id);
    if (!productoServicio) {
      console.error(`Producto/Servicio con ID ${id} no encontrado.`);
      return undefined;
    }
    console.log("Producto/Servicio: ",productoServicio);
    return productoServicio;
  }
  obtenerProductosServiciosPorTipo(tipo: 'Servicio' | 'Producto'): ProductoServicio[] {
    if(tipo == undefined){
      console.error(`Producto/Servicio no encontrado.`);
    }
    return this.productosServicios.filter(productoServicio => productoServicio.tipo === tipo);
  }
}
