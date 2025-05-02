const { crearRoles, leerRoles, actualizarRoles, eliminarRoles} = require('./crud_roles');

// ========== EJEMPLOS DE USO CRUD ROLES ==========

//Crear un rol
//crearRoles(
// 'ADMINISTRADOR'        //nombreRol (puede ser 'CLIENTE', 'OPERARIO', 'ADMINISTRADOR'.)
 //); 

//Leer todos los roles
//leerRoles();

//Actualizar roles 
//actualizarRoles(6,{nombreRol:'OPERARIO'});

//Elimiar rol con ID 6 
//eliminarRoles(6);

//=============FIN EJEMPLOS DE USO===================

//node test_roles.js