// crud_detalleCarrito.js
const connection = require('./conexion');

// Crear detalle carrito
function crearDetalleCarrito(idCarrito, idProducto, cantidad) {
    const sql = 'INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad) VALUES (?, ?, ?)';
    connection.query(sql, [idCarrito, idProducto, cantidad], (error, results) => {
        if (error) {
            console.error('Error al crear detalle carrito:', error.message);
            return;
        }
        console.log('DetalleCarrito creado exitosamente:', results.insertId);
    });
}

// Leer detalle carrito 
function leerDetalleCarrito() {
    const sql = 'SELECT * FROM detalle_carrito';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer detalle carrito:', error.message);
            return;
        }
        console.log('Lista de detalle Carrito:', results);
    });
}
 
// Actualizar detalle Carrito
function actualizarDetalleCarrito(idDetalle, nuevosDatos) {
    const sql = 'UPDATE detalle_carrito SET id_carrito = ?, id_producto = ?, cantidad = ? WHERE id_detalle = ?';
    const values = [
        nuevosDatos.idCarrito, nuevosDatos.idProducto, nuevosDatos.cantidad, idDetalle
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar detalle carrito:', error.message);
            return;
        }
        console.log('DetalleCarrito actualizado correctamente.');
    });
}

// Eliminar detalle Carrito
function eliminarDetalleCarrito(idDetalle) {
    const sql = 'DELETE FROM detalle_carrito WHERE id_detalle = ?';
    connection.query(sql, [idDetalle], (error, results) => {
        if (error) {
            console.error('Error al eliminar detalle carrito:', error.message);
            return;
        }
        console.log('Detalle carrito eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD DETALLE CARRITO ==========

// Crear un detalle de carrito
// crearDetalleCarrito(
//   1,  // idCarrito
//   1,  // idProducto
//   3   // cantidad
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
*/


module.exports = {crearDetalleCarrito, leerDetalleCarrito, actualizarDetalleCarrito, eliminarDetalleCarrito};