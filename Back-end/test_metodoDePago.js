

const {crearMetodoDePago, leerMetodosDePago, actualizarMetodoDePago, eliminarMetodoDePago } = require('./crud_metodoDePago');

// ========== EJEMPLOS DE USO CRUD METODO DE PAGO ==========

// Crear un método de pago
// crearMetodoDePago(
//   8,                     // idUsuario
//   'Tarjeta',             // tipoPago (puede ser 'Tarjeta', 'PSE', 'Efectivo'.)
//   '411111111',           // numeroTarjeta
//   '2026-12-01'              // fechaVencimiento (formato YYYY-MM-DD)
// );

// Leer todos los métodos de pago
// leerMetodosDePago();

// Actualizar método de pago con ID 2
// actualizarMetodoDePago(3, {
//   idUsuario: 8,
//   tipoPago: 'PSE',
//   numeroTarjeta: 'null',
//   fechaVencimiento: 'null'
// });

// Eliminar método de pago con ID 2
// eliminarMetodoDePago(2);

// ========== FIN EJEMPLOS DE USO ==========

//node test_metodoDePago.js