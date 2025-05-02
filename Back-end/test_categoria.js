

const {crearCategoria, leerCategorias, actualizarCategoria, eliminarCategoria } = require('./crud_categoria');

// ========== EJEMPLOS DE USO CRUD CATEGORIA ==========

// Crear una nueva categoría
// crearCategoria(
//   'Despensa',                                                         //nombre
//   'Productos Arroz, Harina, Maizena'                  //descripcion
// );

// Leer todas las categorías
// leerCategorias();

// Actualizar una categoría con ID 1
// actualizarCategoria(1, {
//   nombre: 'Despensa',
//   descripcion: 'Productos Arroz, Harina, Maizena y similares'
// });

// Eliminar una categoría con ID 1
// eliminarCategoria(1);

// ========== FIN EJEMPLOS ========== 

//node test_categoria.js