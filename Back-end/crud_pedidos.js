// crud_pedidos.js
const connection = require('./conexion');

// Crear pedido
function crearPedido(idUsuario, fecha, total, estado) {
    const sql = 'INSERT INTO pedidos (id_usuario, fecha, total, estado) VALUES (?, ?, ?, ?)';
    connection.query(sql, [idUsuario, fecha, total, estado], (error, results) => {
        if (error) {
            console.error('Error al crear pedido:', error.message);
            return;
        }
        console.log('Pedido creado exitosamente:', results.insertId);
    });
}

// Leer pedidos
function leerPedidos() {
    const sql = 'SELECT * FROM pedidos';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer pedidos:', error.message);
            return;
        }
        console.log('Lista de pedidos:', results);
    });
}

// Actualizar pedido
function actualizarPedido(idPedido, nuevosDatos) {
    const sql = 'UPDATE pedidos SET id_usuario = ?, fecha = ?, total = ?, estado = ? WHERE id_pedido = ?';
    const values = [
        nuevosDatos.idUsuario, nuevosDatos.fecha, nuevosDatos.total, nuevosDatos.estado, idPedido];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar pedido:', error.message);
            return; 
        }
        console.log('Pedido actualizado correctamente.');
    });
}

// Eliminar pedido
function eliminarPedido(idPedido) {
    const sql = 'DELETE FROM pedidos WHERE id_pedido = ?';
    connection.query(sql, [idPedido], (error, results) => {
        if (error) {
            console.error('Error al eliminar pedido:', error.message);
            return;
        }
        console.log('Pedido eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD PEDIDOS ==========

// Crear un pedido
// crearPedido(
//   1,               // idUsuario
//   '2025-04-28',    // fecha (en formato YYYY-MM-DD)
//   150000,          // total (valor total de la compra)
//   'Pendiente'      // estado (puede ser 'Pendiente', 'Procesando', 'Enviado', 'Completado', 'Cancelado'.)
// );

// Leer todos los pedidos
// leerPedidos();

// Actualizar pedido con ID 1
// actualizarPedido(1, {
//   idUsuario: 1,
//   fecha: '2025-04-28',
//   total: 160000,
//   estado: 'enviado'
// });

// Eliminar pedido con ID 1
// eliminarPedido(1);

// ========== FIN EJEMPLOS DE USO ==========
*/




module.exports = { crearPedido, leerPedidos, actualizarPedido, eliminarPedido };