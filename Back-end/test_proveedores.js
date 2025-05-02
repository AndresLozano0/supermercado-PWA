
const {crearProveedores, leerProveedores, actualizarProveedores, eliminarProveedor} = require('./crud_proveedores');


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

// Actualizar proveedor con ID 2
// actualizarProveedores(2, {
//   nombre: 'Juan  Gómez',
//   empresa: 'Carnicos SA',
//   telefono: '3009876543',
//   correo: 'jperez@carnicos.com',
//   direccion: 'Calle 12 #5-22',
//   ciudad: 'Medellín',
//   pais: 'Colombia',
//   estado: 'Activo',
//   fechaRegistro: '2025-04-26'
// });

// Eliminar proveedor con ID 1
// eliminarProveedor(1);

// ========== FIN EJEMPLOS DE USO ==========

//node test_proveedores.js