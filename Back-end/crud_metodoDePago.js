// crud_metodoDePago.js
const connection = require('./conexion');

// Crear metodo de pago
function crearMetodoDePago(idUsuario, tipoPago, numeroTarjeta, fechaVencimiento) {
    // Si no es tarjeta, los valores deben ser null
    if (tipoPago !== 'Tarjeta') {
        numeroTarjeta = null;
        fechaVencimiento = null;
    }
    const sql = 'INSERT INTO metodo_de_Pago (id_usuario, tipo_pago, numero_tarjeta, fecha_vencimiento) VALUES (?, ?, ?, ?)';
    connection.query(sql, [idUsuario, tipoPago, numeroTarjeta, fechaVencimiento], (error, results) => {
        if (error) {
            console.error('Error al crear metodo de pago:', error.message);
            return;
        }
        console.log('Metodo de pago creado exitosamente:', results.insertId);
    });
} 

// Leer metodos de pago 
function leerMetodosDePago() {
    const sql = 'SELECT * FROM metodo_de_Pago';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer metodos de pago:', error.message);
            return;
        }
        console.log('Lista de metodos de pago:', results);
    });
}
 
// Actualizar metodo de pago
function actualizarMetodoDePago(idPago, nuevosDatos) {
    // Si no es tarjeta, los valores deben ser null
    if (nuevosDatos.tipoPago !== 'Tarjeta') {
        nuevosDatos.numeroTarjeta = null;
        nuevosDatos.fechaVencimiento = null;
    }
    const sql = 'UPDATE metodo_de_Pago SET id_usuario = ?, tipo_pago = ?, numero_tarjeta = ?, fecha_vencimiento = ? WHERE id_pago = ?';
    const values = [
        nuevosDatos.idUsuario, nuevosDatos.tipoPago, nuevosDatos.numeroTarjeta, nuevosDatos.fechaVencimiento, idPago
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar metodo de pago:', error.message);
            return;
        }
        console.log('metodo de pago actualizado correctamente.');
    });
}

// Eliminar metodoDePago
function eliminarMetodoDePago(idPago) {
    const sql = 'DELETE FROM metodo_de_Pago WHERE id_pago = ?';
    connection.query(sql, [idPago], (error, results) => {
        if (error) {
            console.error('Error al eliminar metodo de pago:', error.message);
            return;
        }
        console.log('Metodo de pago eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD METODO DE PAGO ==========

// Crear un método de pago
// crearMetodoDePago(
//   1,                     // idUsuario
//   'Tarjeta',             // tipoPago (puede ser 'Tarjeta', 'PSE', 'Efectivo'.)
//   '411111111',           // numeroTarjeta
//   '2026-12'              // fechaVencimiento (formato YYYY-MM)
// );

// Leer todos los métodos de pago
// leerMetodosDePago();

// Actualizar método de pago con ID 1
// actualizarMetodoDePago(1, {
//   idUsuario: 1,
//   tipoPago: 'Tarjeta',
//   numeroTarjeta: '422222222',
//   fechaVencimiento: '2027-05'
// });

// Eliminar método de pago con ID 1
// eliminarMetodoDePago(1);

// ========== FIN EJEMPLOS DE USO ==========
*/



module.exports = { crearMetodoDePago, leerMetodosDePago, actualizarMetodoDePago, eliminarMetodoDePago };