// crud_preferencias.js
const connection = require('./conexion');

// Crear preferencia
function crearPreferencia(idUsuario, notificaciones, medio) {
    const sql = 'INSERT INTO preferencias (id_usuario, notificaciones, medio) VALUES (?, ?, ?)';
    connection.query(sql, [idUsuario, notificaciones, medio], (error, results) => {
        if (error) {
            console.error('Error al crear preferencia:', error.message);
            return;
        }
        console.log('Preferencia creada exitosamente:', results.insertId);
    });
}

// Leer preferencias 
function leerPreferencias() {
    const sql = 'SELECT * FROM preferencias';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer preferencias:', error.message);
            return;
        }
        console.log('Lista de preferencias:', results);
    });
}
 
// Actualizar preferencia
function actualizarPreferencia(idPreferencia, nuevosDatos) {
    const sql = 'UPDATE preferencias SET id_usuario = ?, notificaciones = ?, medio = ? WHERE id_preferencia = ?';
    const values = [
        nuevosDatos.idUsuario, nuevosDatos.notificaciones, nuevosDatos.medio, idPreferencia
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar preferencia:', error.message);
            return;
        }
        console.log('Preferencia actualizada correctamente.');
    });
}

// Eliminar preferencia
function eliminarPreferencia(idPreferencia) {
    const sql = 'DELETE FROM preferencias WHERE id_preferencia = ?';
    connection.query(sql, [idPreferencia], (error, results) => {
        if (error) {
            console.error('Error al eliminar preferencia:', error.message);
            return;
        }
        console.log('Preferencia eliminada correctamente.');
    });
}

/* 
// ========== EJEMPLOS DE USO CRUD PREFERENCIAS ==========


// Crear una preferencia
// crearPreferencia(
//   1,             // idUsuario
//   'Sí',          // notificaciones (puede ser 'Sí' o 'No')
//   'correo'       // medio (puede ser 'Correo', 'SMS', 'Whatsapp'.)
// );

// Leer todas las preferencias
// leerPreferencias();

// Actualizar preferencia con ID 1
// actualizarPreferencia(1, {
//   idUsuario: 1,
//   notificaciones: 'no',
//   medio: 'sms'
// });

// Eliminar preferencia con ID 1
// eliminarPreferencia(1);

// ========== FIN EJEMPLOS DE USO ==========
*/

module.exports = { crearPreferencia, leerPreferencias, actualizarPreferencia, eliminarPreferencia };