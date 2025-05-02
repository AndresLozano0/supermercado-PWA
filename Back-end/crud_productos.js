// crud_productos.js
const connection = require('./conexion');

// Crear producto
function crearProducto(idProveedor, idCategoria, nombre, descripcion, precioCompra, precioPublico, fechaRegistro, estado, disponibilidad, imagenURL, cantidad) {
    const sql = 'INSERT INTO productos (id_proveedor, id_categoria, nombre, descripcion, precio_compra, precio_publico, fecha_registro, estado, disponibilidad,  imagen_URL, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [idProveedor, idCategoria, nombre, descripcion, precioCompra, precioPublico, fechaRegistro, estado, disponibilidad, imagenURL, cantidad], (error, results) => {
        if (error) {
            console.error('Error al crear producto:', error.message);
            return;
        }
        console.log('Producto creado exitosamente:', results.insertId);
    });
}

// Leer productos
function leerProductos() {
    const sql = 'SELECT * FROM productos';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al leer productos:', error.message);
            return;
        }
        console.log('Lista de productos:', results);
    });
}

// Actualizar producto
function actualizarProducto(idProducto , nuevosDatos) {
    const sql = 'UPDATE productos SET id_proveedor = ?, id_categoria = ?, nombre = ?, descripcion = ?, precio_compra = ?, precio_publico = ?, fecha_registro = ?, estado = ?, disponibilidad = ?, imagen_URL = ?, cantidad = ? WHERE id_producto = ?';
    const values = [
        nuevosDatos.idProveedor, nuevosDatos.idCategoria, nuevosDatos.nombre, nuevosDatos.descripcion, nuevosDatos.precioCompra, nuevosDatos.precioPublico, nuevosDatos.fechaRegistro, nuevosDatos.estado, nuevosDatos.disponibilidad, nuevosDatos.imagenURL, nuevosDatos.cantidad, idProducto
    ];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error al actualizar producto:', error.message);
            return;
        }
        console.log('Producto actualizado correctamente.');
    });
}

// Eliminar producto
function eliminarProducto(idProducto) {
    const sql = 'DELETE FROM productos WHERE id_producto = ?';
    connection.query(sql, [idProducto], (error, results) => {
        if (error) {
            console.error('Error al eliminar producto:', error.message);
            return;
        }
        console.log('Producto eliminado correctamente.');
    });
}
/* 
// ========== EJEMPLOS DE USO CRUD PRODUCTOS ==========

//crear un producto
//crearProducto(
// 1,                                   //idProveedor
// 2,                                   //idCategoria
// 'Arroz Diana',                       //nombre
// 'Arroz blanco premium',              //descripcion
// 1800,                                //precioCompra
// 2500,                                //precioPublico 
// '2025-04-26',                        //fechaRegistro
// 'Activo',                            //estado (puede ser 'Activo', 'Inactivo'.)
// 'Disponible',                        //disponibilidad (puede ser 'Disponible', 'Bajo stock', 'Agotado'.)
// 'https://ejemplo.com/arroz.jpg',     //imagenURL
// 30                                   //cantidad
// );

//leer todos los productos
//leerProductos();

//actualizar prodcto con ID 1
//actualizarProducto(1, {
// idProveedor: 1, 
// idCategoria: 2,
// nombre: 'Arroz Diana Premium',
// descripcion: 'Arroz blanco mejorado',
// precioCompra: 1900,
// precioPublico: 2700,
// fechaRegistro: '2025-04-26',
// estado: 'activo',
// disponibilidad: 'disponible',
// imagenURL: 'https://ejemplo.com/arroz-premium.jpg',
// cantidad: 45
//});

//Eliminar producto con ID 1
//eliminarProducto(1);
*/

module.exports = { crearProducto, leerProductos, actualizarProducto, eliminarProducto };