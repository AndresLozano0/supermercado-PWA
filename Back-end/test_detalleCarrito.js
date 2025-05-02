

const {crearDetalleCarrito,  leerDetalleCarrito, actualizarDetalleCarrito,eliminarDetalleCarrito } = require('./crud_detalleCarrito');

// ========== EJEMPLOS DE USO CRUD DETALLE CARRITO ==========

// Crear un detalle de carrito
// crearDetalleCarrito(
//   2,  // idCarrito
//   1,  // idProducto
//   7   // cantidad
// );

// Leer todo el detalle del carrito
// leerDetalleCarrito();

// Actualizar un detalle de carrito con id 1
// actualizarDetalleCarrito(1, {
//   idCarrito: 1,
//   idProducto: 1,
//   cantidad: 5
// });

// Eliminar un detalle de carrito con id 1
// eliminarDetalleCarrito(1);

// ========== FIN EJEMPLOS ==========

//node test_detalleCarrito.js