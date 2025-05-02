

const { crearHistorial, leerHistorial, actualizarHistorial, eliminarHistorial } = require('./crud_HistorialPedidos');

// ========== EJEMPLOS DE USO CRUD HISTORIAL PEDIDOS ==========

// Crear historial
// crearHistorial(
//   8,               // idUsuario
//   1,               // idDetalle
//);

// Leer historial completo
// leerHistorial();

// Actualizar historial con ID 1
// actualizarHistorial(1, {
//   idUsuario: 8,
//   idDetalle: 1,
// });

// Eliminar historial con ID 1
// eliminarHistorial(1);

// ========== FIN EJEMPLOS ==========

//node test_historialPedidos.js