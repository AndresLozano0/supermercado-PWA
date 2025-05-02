

const { crearPedido, leerPedidos, actualizarPedido, eliminarPedido } = require('./crud_pedidos');

// ========== EJEMPLOS DE USO CRUD PEDIDOS ==========

// Crear un pedido
// crearPedido(
//   8,               // idUsuario
//   '2025-04-28',    // fecha (en formato YYYY-MM-DD)
//   150000,          // total (valor total de la compra)
//   'Pendiente'      // estado (puede ser 'Pendiente', 'Procesando', 'Enviado', 'Completado', 'Cancelado'.)
// );

// Leer todos los pedidos
// leerPedidos();

// Actualizar pedido con ID 1
// actualizarPedido(1, {
//   idUsuario: 8,
//   fecha: '2025-04-28',
//   total: 160000,
//   estado: 'enviado'
// });

// Eliminar pedido con ID 1
// eliminarPedido(1);

// ========== FIN EJEMPLOS DE USO ==========

//node test_pedidos.js