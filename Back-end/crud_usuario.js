// crud_usuario.js
const connection = require('./conexion');

// Crear usuario
function crearUsuario(nombres, apellidos, sexo, tipoDocumento, numeroDocumento, fechaNacimiento, correo, celular, direccion, idRol, hashContraseña, fechaCreación, estado ) {
    const sql = 'INSERT INTO usuario (nombres, apellidos, sexo, tipo_documento, numero_documento, fecha_nacimiento, correo, celular, direccion, id_rol, hash_contraseña, fecha_creación, estado  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nombres, apellidos, sexo, tipoDocumento, numeroDocumento, fechaNacimiento, correo, celular, direccion, idRol, hashContraseña, fechaCreación, estado], (error, results) => {
        if (error) {
            console.error('Error al crear usuario:', error.message);
            return;
        }
        console.log('usuario creado exitosamente:', results.insertId);
    });
}

// Leer usuario
function leerUsuario() {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer usuarios:', error.message);
            return;
        }
        console.log('Lista de usuarios:', results);
    });
}

// Actualizar usuario
function actualizarUsuario(idUsuario, nuevosDatos) {
    const sql = 'UPDATE usuario SET nombres = ?, apellidos = ?, sexo = ?, tipo_documento = ?, numero_documento = ?, fecha_nacimiento = ?, correo = ?, celular = ?, direccion = ?, id_rol = ?, hash_contraseña = ?, fecha_creación = ?, estado = ? WHERE id_usuario = ?';
    const values = [
        nuevosDatos.nombres, nuevosDatos.apellidos, nuevosDatos.sexo, nuevosDatos.tipoDocumento, nuevosDatos.numeroDocumento, nuevosDatos.fechaNacimiento, nuevosDatos.correo, nuevosDatos.celular, nuevosDatos.direccion, nuevosDatos.idRol, nuevosDatos.hashContraseña, nuevosDatos.fechaCreación, nuevosDatos.estado, idUsuario];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar usuario:', error.message);
            return; 
        }
        console.log('usuario  actualizado correctamente.');
    });
}

// Eliminar usuario
function eliminarUsuario(idUsuario) {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    connection.query(sql, [idUsuario], (error, results) => {
        if (error) {
            console.error('Error al eliminar usuario:', error.message);
            return;
        }
        console.log('usuario eliminado correctamente.');
    });
}

/* 
// ========== EJEMPLOS DE USO CRUD USUARIO ==========

// Crear un usuario
// crearUsuario(
//   'Pedro',                               //nombres
//   'Gómez',                               //apellidos
//   'M',                                   //sexo (puede ser 'M','F'. )
//   'C.C.',                                //tipoDocumento (puede ser 'C.C.', 'T.I.', 'PASAPORTE'.)
//   '1234567890',                          //numeroDocumento 
//   '1990-01-01',                          //fechaNacimiento
//   'pedro@example.com',                   //correo
//   '3101234567',                          //celular   
//   'Calle 123 #45-67',                    //direccion
//   1,                                     // idRol                        
//   'hashed_password_example',             //hashContraseña
//   '2025-04-26',                          // fechaCreación
//   'Activo'                               //estado (puede ser 'Activo', 'Inactivo'.)
// );

// Leer todos los usuarios
// leerUsuario();

// Actualizar usuario con ID 1
// actualizarUsuario(1, {
//   nombres: 'Pedro Antonio',
//   apellidos: 'Gómez Ruiz',
//   sexo: 'M',
//   tipoDocumento: 'C.C.',
//   numeroDocumento: '1234567890',
//   fechaNacimiento: '1990-01-01',
//   correo: 'pedrogomez@example.com',
//   celular: '3109876543',
//   direccion: 'Carrera 45 #67-89',
//   idRol: 1,
//   hashContraseña: 'new_hashed_password',
//   fechaCreación: '2025-04-26',
//   estado: 'activo'
// });

// Eliminar usuario con ID 1
// eliminarUsuario(1);

// ========== FIN EJEMPLOS DE USO ==========
*/

module.exports = { crearUsuario, leerUsuario, actualizarUsuario, eliminarUsuario }; 