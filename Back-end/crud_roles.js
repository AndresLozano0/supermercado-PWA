// crud_roles.js
const connection = require('./conexion');

// Crear rol
function crearRoles(nombreRol) {
    const sql = 'INSERT INTO roles (nombre_rol) VALUES (?)';
    connection.query(sql, [nombreRol], (error, results) => {
        if (error) {
            console.error('Error al crear rol:', error.message);
            return;
        }
        console.log('Rol creado exitosamente:', results.insertId);
    });
}

// Leer roles
function leerRoles() {
    const sql = 'SELECT * FROM roles';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer roles:', error.message);
            return;
        }
        console.log('Lista de roles:', results);
    });
}

// Actualizar roles
function actualizarRoles(idRol, nuevosDatos) {
    const sql = 'UPDATE roles SET nombre_rol = ? WHERE id_rol = ?';
    const values = [
        nuevosDatos.nombreRol, idRol];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar rol:', error.message);
            return; 
        }
        console.log('Rol actualizado correctamente.');
    });
}

// Eliminar roles
function eliminarRoles(idRol) {
    const sql = 'DELETE FROM roles WHERE id_rol = ?';
    connection.query(sql, [idRol], (error, results) => {
        if (error) {
            console.error('Error al eliminar rol:', error.message);
            return;
        }
        console.log('Rol eliminado correctamente.');
    });
}

/* 
// ========== EJEMPLOS DE USO CRUD ROLES ==========

//Crear un rol
//crearRoles(
// 'CLIENTE'        //nombreRol (puede ser 'CLIENTE', 'OPERARIO', 'ADMINISTRADOR'.)
// ); 

//Leer todos los roles
//leerRoles();

//Actualizar roles con ID 1
//actualizarRoles(1,{nombreRol:'OPERARIO'});

//Elimiar rol con ID 1 
//eliminarRoles(1);

//=============FIN EJEMPLOS DE USO===================
*/

module.exports = { crearRoles, leerRoles, actualizarRoles, eliminarRoles };