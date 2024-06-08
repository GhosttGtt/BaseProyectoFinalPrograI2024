const prompt = require('prompt-sync')();


// Clase Factura que implementa la interfaz Facturas
class Factura implements Facturas {
    id_factura: number;
    fecha_hora: Date;
    id_paciente: number;
    id_doctor: number;
    servicios_consumidos: number[];
    total: number;

    constructor(id_factura: number, fecha_hora: string, id_paciente: number, id_doctor: number, servicios_consumidos: number[], total: number) {
        this.id_factura = id_factura;
        this.fecha_hora = new Date(fecha_hora);
        this.id_paciente = id_paciente;
        this.id_doctor = id_doctor;
        this.servicios_consumidos = servicios_consumidos;
        this.total = total;
    }
}

// Datos de facturas iniciales
let facturas: Factura[] = [
    new Factura(1, "2024-06-01T10:00:00", 1, 1, [1], 300),
    new Factura(2, "2024-06-03T14:00:00", 2, 1, [2, 3], 525)
];

// Función para agregar una nueva factura
function agregarFactura() {
    try {
        const id_factura = parseInt(prompt('Ingrese el ID de la factura: ')!);
        const fecha_hora = prompt('Ingrese la fecha y hora (YYYY-MM-DDTHH:MM): ')!;
        const id_paciente = parseInt(prompt('Ingrese el ID del paciente: ')!);
        const id_doctor = parseInt(prompt('Ingrese el ID del doctor: ')!);
        const servicios = prompt('Ingrese los servicios consumidos (separados por comas): ')!;
        const servicios_consumidos = servicios.split(',').map(Number);
        const total = parseFloat(prompt('Ingrese el total: ')!);

        if (isNaN(id_factura) || isNaN(id_paciente) || isNaN(id_doctor) || isNaN(total)) {
            throw new Error("Entrada inválida. Por favor, ingrese valores numéricos donde se requiera.");
        }

        let nuevaFactura = new Factura(id_factura, fecha_hora, id_paciente, id_doctor, servicios_consumidos, total);
        facturas.push(nuevaFactura);
        console.log(`Factura ${id_factura} agregada exitosamente.`);
    } catch (error) {
        console.error("Error al agregar la factura:", error.message);
    }
}

// Función para obtener una factura por su ID
function obtenerFacturaPorID() {
    try {
        const id_factura = parseInt(prompt('Ingrese el ID de la factura que desea buscar: ')!);
        if (isNaN(id_factura)) {
            throw new Error("Entrada inválida. Por favor, ingrese un valor numérico.");
        }

        let factura = facturas.find(f => f.id_factura === id_factura);
        if (factura) {
            console.log(factura);
        } else {
            console.error(`Factura con ID ${id_factura} no encontrada.`);
        }
    } catch (error) {
        console.error("Error al buscar la factura:", error.message);
    }
}

// Función para calcular el total de todas las facturas
function calcularTotalFacturas() {
    try {
        let total = facturas.reduce((acc, factura) => acc + factura.total, 0);
        console.log("Total de todas las facturas:", total);
    } catch (error) {
        console.error("Error al calcular el total de las facturas:", error.message);
    }
}

// Menú de opciones
function menu() {
    const maxIteraciones = 5;
    for (let i = 0; i < maxIteraciones; i++) {
        console.log('\n--- Menú de Facturación ---');
        console.log('1. Agregar Factura');
        console.log('2. Obtener Factura por ID');
        console.log('3. Calcular Total de Facturas');
        console.log('4. Salir');
        const opcion = prompt('Seleccione una opción: ');

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
                console.log("Saliendo del menú...");
                return; // Salir del menú
            default:
                console.log('Opción no válida. Intente nuevamente.');
        }
    }
    console.log("Número máximo de iteraciones alcanzado. Saliendo del menú...");
}

// Ejecutar el menú
menu();