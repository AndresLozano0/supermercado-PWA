// crud_proveedores.js
const connection = require('./conexion');

// Crear proveedor
function crearProveedores(nombre, empresa, telefono, correo, direccion, ciudad, pais, estado, fechaRegistro) {
    const sql = 'INSERT INTO proveedores (nombre, empresa, telefono, correo, direccion, ciudad, pais, estado, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )';
    connection.query(sql, [nombre, empresa, telefono, correo, direccion, ciudad, pais, estado, fechaRegistro], (error, results) => {
        if (error) {
            console.error('Error al crear proveedor:', error.message);
            return;
        }
        console.log('proveedor creado exitosamente:', results.insertId);
    });
}

// Leer proveedores 
function leerProveedores() {
    const sql = 'SELECT * FROM proveedores';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer proveedores:', error.message);
            return;
        }
        console.log('Lista de proveedores:', results);
    });
}
 
// Actualizar proveedores
function actualizarProveedores(idProveedor, nuevosDatos) {
    const sql = 'UPDATE proveedores SET nombre = ?, empresa = ?, telefono = ?, correo = ?, direccion = ?, ciudad = ?, pais = ?, estado = ?, fecha_registro = ?  WHERE id_proveedor = ?';
    const values = [
        nuevosDatos.nombre, nuevosDatos.empresa, nuevosDatos.telefono, nuevosDatos.correo, nuevosDatos.direccion, nuevosDatos.ciudad, nuevosDatos.pais, nuevosDatos.estado, nuevosDatos.fechaRegistro,idProveedor
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar proveedor:', error.message);
            return;
        }
        console.log('Proveedor actualizado correctamente.');
    });
}

// Eliminar proveedor
function eliminarProveedor(idProveedor) {
    const sql = 'DELETE FROM proveedores WHERE id_proveedor = ?';
    connection.query(sql, [idProveedor], (error, results) => {
        if (error) {
            console.error('Error al eliminar proveedor:', error.message);
            return;
        }
        console.log('Proveedor eliminado correctamente.');
    });
}

/* 
// ========== EJEMPLOS DE USO CRUD PROVEEDORES ==========

// Crear un proveedor
// crearProveedores(
//   'Juan Pérez',              //nombre    
//   'Alimentos S.A.',          //empresa
//   '3001234567',              //telefono    
//   'juan@alimentos.com',      //correo
//   'Calle 10 #5-20',          //direccion
//   'Bogotá',                  //ciudad
//   'Colombia',                //pais
//   'Activo',                  //estado (puede ser 'Activo', 'Inactivo'.)  
//   '2025-04-26'               //fechaRegistro
// );

// Leer todos los proveedores
// leerProveedores();

// Actualizar proveedor con ID 1
// actualizarProveedores(1, {
//   nombre: 'Juan Pérez Gómez',
//   empresa: 'Alimentos SA',
//   telefono: '3009876543',
//   correo: 'jperez@alimentos.com',
//   direccion: 'Calle 12 #5-22',
//   ciudad: 'Medellín',
//   pais: 'Colombia',
//   estado: 'activo',
//   fechaRegistro: '2025-04-26'
// });

// Eliminar proveedor con ID 1
// eliminarProveedor(1);

// ========== FIN EJEMPLOS DE USO ==========
*/

module.exports = { crearProveedores, leerProveedores, actualizarProveedores, eliminarProveedor};