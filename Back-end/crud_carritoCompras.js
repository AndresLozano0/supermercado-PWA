// crud_carritoCompras.js
const connection = require('./conexion');

// Crear carrito compras
function crearCarritoCompras(idUsuario, fechaCreacionCarrito, comoRecibir, fechaEntrega, observaciones, estado) {
    // Si no es Recoger en negocio, los valores deben ser null
    if (comoRecibir !== 'Recoger en negocio') {
        fechaEntrega = null;
    }
    const sql = 'INSERT INTO carrito_compras (id_usuario, fecha_creacion_carrito, como_recibir, fecha_entrega, observaciones, estado) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [idUsuario, fechaCreacionCarrito, comoRecibir, fechaEntrega, observaciones, estado ], (error, results) => {
        if (error) {
            console.error('Error al crear carrito de compras:', error.message);
            return;
        }
        console.log('Carrito de compras creado exitosamente:', results.insertId);
    });
}

// Leer carritos de Compras
function leerCarritosCompras() {
    const sql = 'SELECT * FROM carrito_compras';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer carritos de compras:', error.message);
            return;
        }
        console.log('Lista de carritos de compras:', results);
    });
}

// Actualizar carrito de compras
function actualizarCarritoCompras(idCarrito, nuevosDatos) {
     // Si no es Recoger en negocio, los valores deben ser null
     if (nuevosDatos.comoRecibir !== 'Recoger en negocio') {
        nuevosDatos.fechaEntrega = null;
    }
    const sql = 'UPDATE carrito_compras SET id_usuario = ?, fecha_creacion_carrito = ?, como_recibir = ?, fecha_entrega = ?, observaciones = ?, estado = ? WHERE id_carrito = ?';
    const values = [
        nuevosDatos.idUsuario, nuevosDatos.fechaCreacionCarrito, nuevosDatos.comoRecibir, nuevosDatos.fechaEntrega, nuevosDatos.observaciones, nuevosDatos.estado, idCarrito];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar carrito de compras:', error.message);
            return; 
        }
        console.log('Carrito de compras actualizado correctamente.');
    });
}

// Eliminar carrito de compras
function eliminarCarritoCompras(idCarrito) {
    const sql = 'DELETE FROM carrito_compras WHERE id_carrito = ?';
    connection.query(sql, [idCarrito], (error, results) => {
        if (error) {
            console.error('Error al eliminar carrito de compras:', error.message);
            return;
        }
        console.log('Carrito de compras eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD CARRITO DE COMPRAS ==========

// Crear un carrito de compras
//crearCarritoCompras(
// 1,                           //idUsuario
// '2025-04-28',                //fechaCreacionCarrito
// 'Recoger en negocio',         //comoRecivir (puede ser 'Domicilio', 'Recoger en negocio'.)
// '2025-04-30',                //fechaEntrega
// 'Sin observaciones',         //observaciones
// 'Activo'                  //estadp (puede ser 'Activo', 'Inactivo'.)
// );

// Leer todos los carritos de compras
leerCarritosCompras();

// Actualizar un carrito de compras con ID 1
//actualizarCarritoCompras(1, {
    idUsuario: 1,
    fechaCreacionCarrito: '2025-04-28',
    comoRecibir: 'Domicilio',
    fechaEntrega: '2025-05-01',
    observaciones: 'Entregar en la tarde',
    estado: 'Activo'
});

// Eliminar un carrito de compras con ID 1
eliminarCarritoCompras(1);
*/

module.exports = {crearCarritoCompras, leerCarritosCompras, actualizarCarritoCompras, eliminarCarritoCompras};
