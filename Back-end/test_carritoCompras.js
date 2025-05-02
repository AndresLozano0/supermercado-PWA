

const { crearCarritoCompras, leerCarritosCompras, actualizarCarritoCompras, eliminarCarritoCompras } = require('./crud_carritoCompras');

// ========== EJEMPLOS DE USO CRUD CARRITO DE COMPRAS ==========

// Crear un carrito de compras
//crearCarritoCompras(
// 8,                           //idUsuario
// '2025-04-28',                //fechaCreacionCarrito
// 'Recoger en negocio',         //comoRecibir (puede ser 'Domicilio', 'Recoger en negocio'.)
// '2025-04-30',                //fechaEntrega
// 'Paso al medio dia, gracias :D',         //observaciones
// 'Activo'                  //estado (puede ser 'Activo', 'Inactivo'.)
// );

// Leer todos los carritos de compras
//leerCarritosCompras();

// Actualizar un carrito de compras con ID 1
//actualizarCarritoCompras(1, {
//    idUsuario: 8,
//    fechaCreacionCarrito: '2025-04-28',
//    comoRecibir: 'Domicilio',
//    fechaEntrega: 'null',
//    observaciones: 'sino hay coca cola, una sprite está bien',
//    estado: 'Activo'
//});

// Eliminar un carrito de compras con ID 1
//eliminarCarritoCompras(1);

// ========== FIN EJEMPLOS ==========


//node test_carritoCompras.js