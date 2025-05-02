

const {crearPreferencia, leerPreferencias, actualizarPreferencia, eliminarPreferencia } = require('./crud_preferencias');

// ========== EJEMPLOS DE USO CRUD PREFERENCIAS ==========


// Crear una preferencia
// crearPreferencia(
//   8,             // idUsuario
//   'Sí',          // notificaciones (puede ser 'Sí' o 'No')
//   'correo'       // medio (puede ser 'Correo', 'SMS', 'Whatsapp'.)
// );

// Leer todas las preferencias
// leerPreferencias();

// Actualizar preferencia con ID 1
// actualizarPreferencia(1, {
//   idUsuario: 8,
//   notificaciones: 'no',
//   medio: 'sms'
// });

// Eliminar preferencia con ID 1
// eliminarPreferencia(1);

// ========== FIN EJEMPLOS DE USO ==========

//node test_preferencias.js