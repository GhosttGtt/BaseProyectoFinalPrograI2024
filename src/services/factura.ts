import * as fs from 'fs';
import { Factura } from '../interfaces/factura.interface';
import { ProductoServicioService } from './productos_servicios';

export class FacturaService {
  private facturas: Factura[] = [];
  private productoServicioService: ProductoServicioService;

  constructor(productoServicioService: ProductoServicioService) {
    this.productoServicioService = productoServicioService;
    this.cargarFacturas();
}

  private cargarFacturas(): void {
    try {
      const data = fs.readFileSync('./data/facturas.json', 'utf-8');
      this.facturas = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar las facturas:', error);
    }
  }

  private guardarFacturas(): void {
    fs.writeFileSync('./data/facturas.json', JSON.stringify(this.facturas, null, 2));
  }

  crearFactura(factura: Omit<Factura, 'id_factura'>): Factura {
    const serviciosNombres = factura.servicios_consumidos.map(idServicio => {
      const servicio = this.productoServicioService.obtenerProductoServicioPorId(idServicio);
      return servicio ? servicio.nombre : 'Servicio no encontrado';
  });
    const nuevoId = this.facturas.length > 0 ? this.facturas[this.facturas.length - 1].id_factura + 1 : 1;
    const nuevaFactura = { ...factura, id_factura: nuevoId };
    this.facturas.push(nuevaFactura);
    this.guardarFacturas();
    return nuevaFactura;
}

  editarFactura(idFactura: number, nuevosServicios: number[], nuevoTotal: number): void {
    const factura = this.obtenerFacturaPorId(idFactura);
    if (factura) {
      factura.servicios_consumidos = nuevosServicios;
      factura.total = nuevoTotal;
      this.guardarFacturas();
    }
  }

  eliminarFactura(idFactura: number): void {
    this.facturas = this.facturas.filter(factura => factura.id_factura !== idFactura);
    this.guardarFacturas();
  }

  obtenerFacturasPorCliente(idCliente: number): Factura[] {
    return this.facturas.filter(factura => factura.id_paciente === idCliente);
}

  obtenerProductosPorFactura(idFactura: number): any[] {
        const factura = this.obtenerFacturaPorId(idFactura);
        if (factura) {
            return factura.servicios_consumidos.map(id => {
                const productoServicio = this.productoServicioService.obtenerProductoServicioPorId(id);
                return productoServicio ? { nombre: productoServicio.nombre, precio: productoServicio.precio } : null;
            }).filter(productoServicio => productoServicio !== null);
        }
        return [];
    }

    obtenerFacturasPorFecha(fecha: Date): Factura[] {
      const fechaSinHora = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
      return this.facturas.filter(factura => {
          const facturaFecha = new Date(factura.fecha_hora);
          const facturaFechaSinHora = new Date(facturaFecha.getFullYear(), facturaFecha.getMonth(), facturaFecha.getDate());
          return facturaFechaSinHora.getTime() === fechaSinHora.getTime(),'T00:00';
      });
  }

obtenerTotalFacturacionPorMes(mes: number, anio: number): number {
  const facturasMes = this.facturas.filter(factura => {
      const fecha = new Date(factura.fecha_hora);
      return fecha.getMonth() === mes && fecha.getFullYear() === anio;
  });
  return facturasMes.reduce((total, factura) => total + factura.total, 0);
}

  obtenerFacturaPorId(idFactura: number): Factura | undefined {
    return this.facturas.find(factura => factura.id_factura === idFactura);
  }
  
}
