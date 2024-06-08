export interface ProductoServicio {
    id_producto_servicio: number
    tipo?: 'Servicio' | ' Producto' | string;
    nombre: string
    precio: number
}

