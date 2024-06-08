class Factura {
    constructor(id_factura, fecha_hora, id_paciente, id_doctor, servicios_consumidos, total) {
        this.id_factura = id_factura;
        this.fecha_hora = new Date(fecha_hora);
        this.id_paciente = id_paciente;
        this.id_doctor = id_doctor;
        this.servicios_consumidos = servicios_consumidos;
        this.total = total;
    }
}

// Datos de facturas iniciales
let facturas = [
    new Factura(1, "2024-06-01 10:00", 1, 1, [1], 300),
    new Factura(2, "2024-06-03 14:00", 2, 1, [2, 3], 525)
];

// Función para agregar una nueva factura
function agregarFactura() {
    try {
        const id_factura = parseInt(prompt('Ingrese el ID de la factura: '));
        const fecha_hora = prompt('Ingrese la fecha y hora (YYYY-MM-DD HH:MM): ');
        const id_paciente = parseInt(prompt('Ingrese el ID del paciente: '));
        const id_doctor = parseInt(prompt('Ingrese el ID del doctor: '));
        const servicios = prompt('Ingrese los servicios consumidos (separados por comas): ');
        const servicios_consumidos = servicios.split(',').map(Number);
        const total = parseFloat(prompt('Ingrese el total: '));

        let nuevaFactura = new Factura(id_factura, fecha_hora, id_paciente, id_doctor, servicios_consumidos, total);
        facturas.push(nuevaFactura);
        console.log(`Factura ${id_factura} agregada exitosamente.`);
    } catch (error) {
        console.error("Error al agregar la factura:", error);
    }
}

// Función para obtener una factura por su ID
function obtenerFacturaPorID() {
    try {
        const id_factura = parseInt(prompt('Ingrese el ID de la factura que desea buscar: '));
        let factura = facturas.find(f => f.id_factura === id_factura);
        if (factura) {
            console.log(factura);
        } else {
            console.error(`Factura con ID ${id_factura} no encontrada.`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Función para calcular el total de todas las facturas
function calcularTotalFacturas() {
    try {
        let total = facturas.reduce((acc, factura) => acc + factura.total, 0);
        console.log("Total de todas las facturas:", total);
    } catch (error) {
        console.error("Error al calcular el total de las facturas:", error);
    }
}

// Menú de opciones
let opcion = '';
while (opcion !== '4') {
    opcion = prompt('\n--- Menú de Facturación ---\n 1. Agregar Factura \n 2. Obtener Factura por ID \n 3. Calcular Total de Facturas \n 4. Salir');
    switch (opcion) {
        case '1':
            agregarFactura();
            break;
        case '2':
            obtenerFacturaPorID();
            break;
        case '3':
            calcularTotalFacturas();
            break;
        case '4':
            console.log('Saliendo del programa...');
            break;
        default:
            console.log('Opción no válida. Intente nuevamente.');
    }
}
