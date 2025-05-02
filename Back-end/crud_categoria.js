// crud_categoria.js
const connection = require('./conexion');

// Crear categoria
function crearCategoria(nombre, descripcion) {
    const sql = 'INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)';
    connection.query(sql, [nombre, descripcion], (error, results) => {
        if (error) {
            console.error('Error al crear categoria:', error.message);
            return;
        }
        console.log('Categoria creada exitosamente:', results.insertId);
    });
}

// Leer categorias
function leerCategorias() {
    const sql = 'SELECT * FROM categoria';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer categorias:', error.message);
            return;
        }
        console.log('Lista de categorias:', results);
    });
}

// Actualizar categoria
function actualizarCategoria(idCategoria, nuevosDatos) {
    const sql = 'UPDATE categoria SET nombre = ?, descripcion = ? WHERE id_categoria = ?';
    const values = [
        nuevosDatos.nombre, nuevosDatos.descripcion, idCategoria];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar categoria:', error.message);
            return; 
        }
        console.log('Categoria actualizada correctamente.');
    });
}

// Eliminar categoria
function eliminarCategoria(idCategoria){
    const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
    connection.query(sql, [idCategoria], (error, results) => {
        if (error) {
            console.error('Error al eliminar categoria:', error.message);
            return;
        }
        console.log('Categoria eliminada correctamente.');
    });
}

/* 
// ========== EJEMPLOS DE USO CRUD CATEGORIA ==========

// Crear una nueva categoría
// crearCategoria(
//   'Bebidas',                                                         //nombre
//   'Productos líquidos como agua, refrescos y jugos'                  //descripcion
// );

// Leer todas las categorías
// leerCategorias();

// Actualizar una categoría con ID 1
// actualizarCategoria(1, {
//   nombre: 'Bebidas y Snacks',
//   descripcion: 'Productos líquidos y snacks rápidos'
// });

// Eliminar una categoría con ID 1
// eliminarCategoria(1);

// ========== FIN EJEMPLOS ==========
*/


module.exports = {crearCategoria, leerCategorias, actualizarCategoria, eliminarCategoria};
