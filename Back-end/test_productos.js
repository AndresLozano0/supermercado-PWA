

const {crearProducto, leerProductos, actualizarProducto, eliminarProducto  } = require('./crud_productos');

// ========== EJEMPLOS DE USO CRUD PRODUCTOS ==========

//crear un producto
//crearProducto(
// 1,                                   //idProveedor
// 1,                                   //idCategoria
// 'Arroz Diana',                       //nombre
// 'Arroz blanco premium 500gr',              //descripcion
// 1800,                                //precioCompra
// 2500,                                //precioPublico 
// '2025-04-26',                        //fechaRegistro
// 'Activo',                            //estado (puede ser 'Activo', 'Inactivo'.)
// 'Disponible',                        //disponibilidad (puede ser 'Disponible', 'Bajo stock', 'Agotado'.)
// 'https://www.google.com/search?q=arroz+diabla+blaco+premium&sca_esv=0d43da4d4cf24184&udm=2&biw=1536&bih=776&sxsrf=AHTn8zp3OhFEpNMNNt4K234xrh54AdMgHQ%3A1745935881976&ei=Cd4QaKygO9qXwbkPqY7eiQ8&ved=0ahUKEwjsyK6Atv2MAxXaSzABHSmHN_EQ4dUDCBE&uact=5&oq=arroz+diabla+blaco+premium&gs_lp=EgNpbWciGmFycm96IGRpYWJsYSBibGFjbyBwcmVtaXVtSJ0YUN4SWN4ScAJ4AJABAJgBiQGgAYkBqgEDMC4xuAEDyAEA-AEB-AECmAICoAITqAIKwgIKECMYJxjJAhjqApgDDJIHATKgBy2yBwC4BwA&sclient=img#vhid=cOTkQ0B9lWlAsM&vssid=mosaic',     //imagenURL
// 30                                   //cantidad
// );

//leer todos los productos
//leerProductos();

//actualizar prodcto con ID 1
//actualizarProducto(1, {
// idProveedor: 1, 
// idCategoria: 1,
// nombre: 'Arroz Diana Premium',
// descripcion: 'Arroz blanco mejorado 500gr',
// precioCompra: 1900,
// precioPublico: 2700,
// fechaRegistro: '2025-04-26',
// estado: 'activo',
// disponibilidad: 'disponible',
// imagenURL: 'https://www.google.com/search?q=arroz+diabla+blaco+premium&sca_esv=0d43da4d4cf24184&udm=2&biw=1536&bih=776&sxsrf=AHTn8zp3OhFEpNMNNt4K234xrh54AdMgHQ%3A1745935881976&ei=Cd4QaKygO9qXwbkPqY7eiQ8&ved=0ahUKEwjsyK6Atv2MAxXaSzABHSmHN_EQ4dUDCBE&uact=5&oq=arroz+diabla+blaco+premium&gs_lp=EgNpbWciGmFycm96IGRpYWJsYSBibGFjbyBwcmVtaXVtSJ0YUN4SWN4ScAJ4AJABAJgBiQGgAYkBqgEDMC4xuAEDyAEA-AEB-AECmAICoAITqAIKwgIKECMYJxjJAhjqApgDDJIHATKgBy2yBwC4BwA&sclient=img#vhid=cOTkQ0B9lWlAsM&vssid=mosaic',
// cantidad: 45
//});

//Eliminar producto con ID 1
//eliminarProducto(1);

// ========== FIN EJEMPLOS DE USO ==========

//node test_productos.js