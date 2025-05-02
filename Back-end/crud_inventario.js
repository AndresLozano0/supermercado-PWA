// crud_inventario.js
const connection = require('./conexion');

// Crear inventario
function crearInventario(idProducto, stock, fechaActualizacion) {
    const sql = 'INSERT INTO inventario (id_producto, stock, fecha_actualizacion) VALUES (?, ?, ?)';
    connection.query(sql, [idProducto, stock, fechaActualizacion], (error, results) => {
        if (error) {
            console.error('Error al crear inventario:', error.message);
            return;
        }
        console.log('Inventario creado exitosamente:', results.insertId);
    });
}

// Leer inventario 
function leerInventario() {
    const sql = 'SELECT * FROM inventario';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer inventario:', error.message);
            return;
        }
        console.log('Lista de inventario:', results);
    });
}
 
// Actualizar inventario
function actualizarInventario(idInventario, nuevosDatos) {
    const sql = 'UPDATE inventario SET id_producto = ?, stock = ?, fecha_actualizacion = ? WHERE id_inventario = ?';
    const values = [
        nuevosDatos.idProducto, nuevosDatos.stock, nuevosDatos.fechaActualizacion, idInventario
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar inventario:', error.message);
            return;
        }
        console.log('Inventario actualizado correctamente.');
    });
}

// Eliminar inventario
function eliminarInventario(idInventario) {
    const sql = 'DELETE FROM inventario WHERE id_inventario = ?';
    connection.query(sql, [idInventario], (error, results) => {
        if (error) {
            console.error('Error al eliminar inventario:', error.message);
            return;
        }
        console.log('Inventario eliminado correctamente.');
    });
}
/* 
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
*/



module.exports = { crearInventario, leerInventario, actualizarInventario, eliminarInventario };