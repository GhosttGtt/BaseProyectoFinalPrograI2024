# Proyecto de Examen Final - Programación I 💻

El proyecto requiere la formación de grupos de 4 a 6 personas, dependiendo de la afinidad entre los estudiantes. Cada estudiante debe asumir la responsabilidad de buscar compañeros para conformar su grupo. Una vez que el grupo esté completo, se debe enviar un correo electrónico con el asunto "Integrantes Proyecto Examen Final - Programación I" a la dirección de correo electrónico del catedrático. En este correo, cada estudiante debe proporcionar los siguientes datos: nombre completo, número de carnet y correo electrónico institucional.

La entrega del proyecto debe entregarse en un repositorio de GitHub; cualquier entrega en otro formato será descartada. El resultado del proyecto deberá ser presentado y explicado en clase el día del examen, de forma presencial (todos los miembros del grupo deben estar presentes).

La suite de pruebas para evaluar el examen será entregada el miércoles 29 de mayo (se agregará a este repositorio también). Se debe revisar la rúbrica de la tarea para conocer los criterios de evaluación.

## Descripción del Proyecto 📝

Basándose en el repositorio adjunto (debe hacer fork del mismo), se debe crear un programa en TypeScript que simule el funcionamiento básico de una aplicación de gestión interna para una clínica dental que permita al personal llevar a cabo actividades relacionadas con la atención dental, la programación de citas, la gestión de pacientes, el registro de recetas, la administración de productos y servicios, y la facturación de servicios prestados.

Recuerden que todos los datos se deben persistir en archivos .json, utilizando el método enseñado en clase para este objetivo.

### Requisitos:

- **Autenticación de usuarios:** 🔐 El sistema debe permitir la creación de cuentas de usuario para el personal de la clínica para acceder a las funciones específicas del sistema.

  * Crear usuario
  * Editar usuario
  * Deshabilitar ususario (se toma como eliminación, para deshabilitar el inicio de sesión cuando un usuario está deshabilitado)
  * Autenticar usuario (funcionalidad de inicio de sesión, validar credenciales)
  * Desautenticar usuario 

- **Registro de pacientes:** 📋 El personal de la clínica debe poder registrar pacientes en el sistema, incluyendo información personal como nombre, fecha de nacimiento, dirección, número de teléfono, así como datos médicos relevantes como alergias, medicamentos actuales y condiciones médicas preexistentes.

  * Crear paciente
  * Editar paciente
  * Eliminar paciente
  * Obtener un paciente (buscar por ID)
  * Obtener edad de un paciente 
  * Obtener todos los pacientes
  * Conteo de pacientes (total de pacientes registrados)
  * Obtener las últimas 5 recetas del paciente

- **Programación de citas:** 🗓️ El personal de la clínica debe poder programar y gestionar citas para servicios dentales, asignando pacientes y doctores a cada cita.
  
  * Programar cita
  * Cancelar cita
  * Reprogramar cita
  * Obtener citas de un doctor
  * Obtener citas de un paciente
  - Obtener citas por fecha


- **Gestión de doctores y horarios:** ⏰ Los administradores de la clínica deben poder gestionar los horarios de los doctores, asignando horarios de trabajo disponibles.

  * Crear doctor
  * Editar doctor y sus horarios
  * Eliminar doctor
  * Obtener un doctor (buscar por ID)
  * Obtener doctores disponibles para una fecha específica
  * Obtener todos los doctores
  * Conteo de doctores (total de doctores registrados)
  * Validar disponibilidad de un doctor para una fecha específica

- **Registro de recetas:** 💊 Los doctores deben poder generar recetas médicas para medicamentos y tratamientos dentales, especificando la dosis, frecuencia y duración del tratamiento, y adjuntándolas al historial médico del paciente.

  * Crear recetas
  * Editar recetas
  * Eliminar recetas
  * Obtener recetas de un paciente
  * Obtener medicamentos de una receta

- **Administración de productos y servicios:** 💼 El sistema debe mantener un catálogo de productos y servicios dentales, incluyendo servicios como limpiezas, empastes, extracciones, tratamientos de conducto, ortodoncia, blanqueamiento dental, entre otros.

  * Crear producto/servicio
  * Editar producto/servicio
  * Eliminar producto/servicio
  * Obtener un producto/servicio (buscar por ID)
  * Obtener todos los productos/servicios por tipo

- **Facturación de servicios prestados:** 💵 Después de cada cita, el sistema debe generar una factura que muestre un resumen de los servicios consumidos (incluyendo procedimientos realizados y productos utilizados) y los honorarios correspondientes a la cita. Esta factura debe ser almacenada en el sistema para futuras referencias.

  * Crear factura
  * Editar factura (debe editar el total, al modificar los servicios_consumidos)
  * Eliminar factura
  * Obtener facturas por cliente
  * Obtener productos por factura (nombre y precio de cada producto)
  * Obtener facturas por una fecha específica
  * Obtener total de facturación por mes

## ¡Buena suerte y éxito en su proyecto! 🍀🚀

¡Les deseamos lo mejor en la realización de este proyecto de examen final en Programación I! Aprovechen esta oportunidad para poner en práctica todo lo aprendido durante el curso y para desarrollar habilidades clave en el desarrollo de software.

Algunos consejos para el éxito:

1. **Organización:** 📅 Planifiquen bien su tiempo y asignen tareas de manera eficiente dentro del equipo. La organización es clave para cumplir con los plazos y objetivos establecidos.

2. **Colaboración:** 👥 Trabajen en equipo y aprovechen las fortalezas individuales de cada miembro. La colaboración y el intercambio de ideas son fundamentales para el éxito del proyecto.

3. **Persistencia:** 💪 Ante los desafíos y obstáculos que puedan surgir, mantengan la motivación y la determinación para superarlos. La persistencia es fundamental para alcanzar los objetivos propuestos.

4. **Creatividad:** 🎨 Piensen de manera creativa para encontrar soluciones innovadoras a los problemas planteados en el proyecto. La creatividad puede marcar la diferencia en la calidad del trabajo final.

5. **Aprendizaje:** 📚 Aprovechen esta experiencia para seguir aprendiendo y mejorando sus habilidades en programación. Cada desafío es una oportunidad de crecimiento personal y profesional.

Recuerden que el proceso de desarrollo de software es un viaje lleno de aprendizajes y descubrimientos. Disfruten del proceso y confíen en su capacidad para alcanzar el éxito.

¡Les deseamos mucho éxito en su proyecto y en su futuro como desarrolladores de software! 🎉👏
