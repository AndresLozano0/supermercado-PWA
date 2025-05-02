


const { crearUsuario, leerUsuario, actualizarUsuario, eliminarUsuario} = require('./crud_usuario');

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
//   6,                                     // idRol                        
//   'hashed_password_example',             //hashContraseña
//   '2025-04-26',                          // fechaCreación
//   'Activo'                               //estado (puede ser 'Activo', 'Inactivo'.)
// );

// Leer todos los usuarios
// leerUsuario();

// Actualizar usuario con ID 12
// actualizarUsuario(12, {
//   nombres: ' Andres',
//   apellidos: 'Lozano',
//   sexo: 'M',
//   tipoDocumento: 'C.C.',
//   numeroDocumento: '5111111111',
//   fechaNacimiento: '2001-11-10',
//   correo: 'andresafla42@gmail.com',
//   celular: '3046676598',
//   direccion: 'calle 108 cr4b. Ibague, Tolima',
//   idRol: 7,
//   hashContraseña: 'Aresito.123',
//   fechaCreación: '2025-04-29 19:16:06',
//   estado: 'Activo'
// });

// Eliminar usuario con ID 8
// eliminarUsuario(8);

// ========== FIN EJEMPLOS DE USO ==========

//node test_usuario.js