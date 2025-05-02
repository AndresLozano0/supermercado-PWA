// crud_historial.js
const connection = require('./conexion');

// Crear historial
function crearHistorial(idUsuario, idDetalle) {
    const sql = 'INSERT INTO historial_pedidos (id_usuario, id_detalle) VALUES (?, ?)';
    connection.query(sql, [idUsuario, idDetalle], (error, results) => {
        if (error) {
            console.error('Error al crear historial:', error.message);
            return;
        }
        console.log('Historial creado exitosamente:', results.insertId);
    });
}

// Leer historial 
function leerHistorial() {
    const sql = 'SELECT * FROM historial_pedidos';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer historial:', error.message);
            return;
        }
        console.log('Lista de historial:', results);
    });
}
 
// Actualizar historial
function actualizarHistorial(idHistorial, nuevosDatos) {
    const sql = 'UPDATE historial_pedidos SET id_usuario = ?, id_detalle = ? WHERE id_historial = ?';
    const values = [
        nuevosDatos.idUsuario, nuevosDatos.idDetalle, idHistorial
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar historial:', error.message);
            return;
        }
        console.log('Historial actualizado correctamente.');
    });
}

// Eliminar historial
function eliminarHistorial(idHistorial) {
    const sql = 'DELETE FROM historial_pedidos WHERE id_historial = ?';
    connection.query(sql, [idHistorial], (error, results) => {
        if (error) {
            console.error('Error al eliminar historial:', error.message);
            return;
        }
        console.log('Historial eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD HISTORIAL PEDIDOS ==========

// Crear historial
// crearHistorial(
//   8,               // idUsuario
//   1,               // idDetalle
// );

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
*/


module.exports = {crearHistorial, leerHistorial, actualizarHistorial, eliminarHistorial };