

const {crearInventario, leerInventario, actualizarInventario, eliminarInventario } = require('./crud_Inventario');

// ========== EJEMPLOS DE USO CRUD INVENTARIO ==========

// Crear inventario
// crearInventario(
//   1,               // idProducto
//   50,              // stock inicial
//   '2025-04-28'     // fechaActualizacion
// );

// Leer todo el inventario
// leerInventario();

// Actualizar inventario con ID 1
// actualizarInventario(1, {
//   idProducto: 1,
//   stock: 75,
//   fechaActualizacion: '2025-04-29'
// });

// Eliminar inventario con ID 1
// eliminarInventario(1);

// ========== FIN EJEMPLOS ==========

//node test_inventario.js