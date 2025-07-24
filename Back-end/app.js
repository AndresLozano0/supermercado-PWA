// Importación del módulo express
const express = require('express');
const app = express();
const port = 3000;

// Importación del archivo de conexión a MySQL
const connection = require('./conexion');

// Importación de session
const session = require('express-session');

// Configuración de sesión (debe ir antes de las rutas)
app.use(session({
  secret: 'secreto-supermercado',
  resave: false,
  saveUninitialized: true,
}));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos HTML y otros estáticos desde una carpeta pública 
app.use(express.static('public'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

// Ruta para registrar usuarios nuevos
app.post('/registro', (req, res) => {
  const datos = req.body;

  const sql = `
    INSERT INTO usuario 
    (nombres, apellidos, sexo, tipo_documento, numero_documento, fecha_nacimiento, correo, celular, direccion, id_rol, hash_contraseña, fecha_creación, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
  `;

  const valores = [
    datos.nombres,
    datos.apellidos,
    datos.sexo,
    datos.tipo_documento,
    datos.numero_documento,
    datos.fecha_nacimiento,
    datos.correo,
    datos.celular,
    datos.direccion,
    datos.id_rol || 6,
    datos.hash_contraseña,
    'Activo'
  ];

  connection.query(sql, valores, (error) => {
    if (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.redirect('/login.html');
    }
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { contacto, contraseña } = req.body;

  const sql = `
    SELECT * FROM usuario
    WHERE (correo = ? OR celular = ?) AND estado = 'Activo'
  `;

  connection.query(sql, [contacto, contacto], (error, results) => {
    if (error) {
      console.error('Error en login:', error);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado o inactivo');
    }

    const usuario = results[0];

    if (contraseña !== usuario.hash_contraseña) {
      return res.status(401).send('Contraseña incorrecta');
    }

    req.session.usuario = usuario;
    res.send('Inicio de sesión exitoso');
  });
});

// Ruta para cerrar sesión ✅ PASO 4 UBICADO CORRECTAMENTE
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    res.clearCookie('connect.sid');
    res.send('Sesión cerrada');
  });
});

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const sql = "SELECT * FROM productos WHERE estado = 'Activo'";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', error);
      return res.status(500).send('Error en el servidor');
    }

    res.json(results);
  });
});

// Ruta para hacer pedido
app.post('/pedir', (req, res) => {
  const usuario = req.session.usuario;
  const id_producto = req.body.id;

  if (!usuario) {
    return res.send('Debes iniciar sesión para hacer un pedido');
  }

  const sql = `INSERT INTO pedidos (id_usuario, id_producto) VALUES (?, ?)`;

  connection.query(sql, [usuario.id_usuario, id_producto], (err) => {
    if (err) {
      console.error('Error al registrar pedido:', err);
      return res.status(500).send('Error al hacer el pedido');
    }

    res.send('Pedido registrado correctamente ✅');
  });
});

// Ruta para consultar pedidos del usuario
app.get('/api/mis-pedidos', (req, res) => {
  const usuario = req.session.usuario;

  if (!usuario) {
    return res.status(401).send('No has iniciado sesión');
  }

  const sql = `
    SELECT p.id_pedido, pr.nombre AS producto, pr.precio_publico AS precio, d.cantidad, p.fecha
    FROM pedidos p
    JOIN pedido_detalle d ON p.id_pedido = d.id_pedido
    JOIN productos pr ON pr.id_producto = d.id_producto
    WHERE p.id_usuario = ?
    ORDER BY p.fecha DESC
  `;

  connection.query(sql, [usuario.id_usuario], (err, results) => {
    if (err) {
      console.error('Error al obtener pedidos:', err);
      return res.status(500).send('Error al obtener tus pedidos');
    }

    res.json(results);
  });
});

// Ruta para verificar si hay usuario autenticado
app.get('/usuario', (req, res) => {
  if (req.session && req.session.usuario) {
    res.json({ autenticado: true, usuario: req.session.usuario });
  } else {
    res.json({ autenticado: false });
  }
});

// Ruta para confirmar pedido (desde carrito)
app.post('/confirmar-pedido', (req, res) => {
  const usuario = req.session.usuario;
  const productos = req.body.productos;
  const { metodo_pago, como_recibir, direccion } = req.body;

  if (!usuario) return res.status(401).send('Debes iniciar sesión para confirmar el pedido');
  if (!Array.isArray(productos) || productos.length === 0) return res.status(400).send('No hay productos');
  if (!metodo_pago || !metodo_pago.tipo) return res.status(400).send('Método de pago inválido');
  if (!como_recibir) return res.status(400).send('Seleccione cómo desea recibir el pedido');

  const idsProductos = productos.map(p => p.id_producto);

  const sqlStock = `SELECT id_producto, cantidad FROM productos WHERE id_producto IN (?)`;
  connection.query(sqlStock, [idsProductos], (err, resultados) => {
    if (err) return res.status(500).send('Error interno al verificar stock');

    const stockInsuficiente = productos.some(prod => {
      const dbProd = resultados.find(p => p.id_producto === prod.id_producto);
      return !dbProd || dbProd.cantidad < prod.cantidad;
    });

    if (stockInsuficiente) return res.status(400).send('Stock insuficiente');

    const sqlInsertPedido = `INSERT INTO pedidos (id_usuario, fecha, estado) VALUES (?, NOW(), 'pendiente')`;
    connection.query(sqlInsertPedido, [usuario.id_usuario], (err2, resultado) => {
      if (err2) return res.status(500).send('Error al confirmar pedido');

      const idPedido = resultado.insertId;

      const detalles = productos.map(p => [idPedido, p.id_producto, p.cantidad, p.precio]);
      const sqlInsertDetalle = `
        INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, precio_unitario)
        VALUES ?
      `;

      connection.query(sqlInsertDetalle, [detalles], (err3) => {
        if (err3) return res.status(500).send('Error al registrar productos');

        const sqlPago = `
          INSERT INTO metodo_de_pago (id_usuario, tipo_pago, numero_tarjeta, fecha_vencimiento)
          VALUES (?, ?, ?, ?)
        `;
        connection.query(sqlPago, [
          usuario.id_usuario,
          metodo_pago.tipo,
          metodo_pago.numero_tarjeta || null,
          metodo_pago.vencimiento || null
        ], (err4) => {
          if (err4) return res.status(500).send('Error al guardar método de pago');

          const sqlRecibir = `
            INSERT INTO carrito_compras (id_usuario, id_pedido, como_recibir, direccion)
            VALUES (?, ?, ?, ?)
          `;
          connection.query(sqlRecibir, [
            usuario.id_usuario,
            idPedido,
            como_recibir,
            como_recibir === 'domicilio' ? direccion : null
          ], (err5) => {
            if (err5) return res.status(500).send('Error al guardar método de entrega');

            // Actualizar stock
            productos.forEach(p => {
              const sqlActualizarStock = `UPDATE productos SET cantidad = cantidad - ? WHERE id_producto = ?`;
              connection.query(sqlActualizarStock, [p.cantidad, p.id_producto]);
            });

            res.send('✅ Pedido confirmado, pago registrado y stock actualizado');
          });
        });
      });
    });
  });
});


//Un middleware que verifique el rol del usuario

function esAdminOEmpleado(req, res, next) {
  const usuario = req.session.usuario;

  if (!usuario || (usuario.id_rol !== 8 && usuario.id_rol !== 7)) {
    return res.status(403).send('Acceso denegado. Solo administradores u operadores.');
  }

  next();
}

// Obtener productos (activos o todos si lo deseas)
app.get('/api/admin/productos', esAdminOEmpleado, (req, res) => {
  const sql = 'SELECT * FROM productos'; // o WHERE estado = 'Activo' si quieres solo activos
  connection.query(sql, (err, resultados) => {
    if (err) return res.status(500).send('Error al obtener productos');
    res.json(resultados);
  });
});

// Crear producto
app.post('/api/admin/productos', esAdminOEmpleado, (req, res) => {
  const {
    id_proveedor, id_categoria, nombre, descripcion,
    precio_compra, precio_publico, disponibilidad,
    imagen_URL, cantidad
  } = req.body;

  const sql = `
    INSERT INTO productos 
    (id_proveedor, id_categoria, nombre, descripcion, precio_compra, precio_publico, disponibilidad, imagen_URL, cantidad)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [
    id_proveedor, id_categoria, nombre, descripcion,
    precio_compra, precio_publico, disponibilidad || 'Disponible',
    imagen_URL, cantidad || 0
  ], (err) => {
    if (err) return res.status(500).send('Error al registrar el producto');
    res.send('✅ Producto creado correctamente');
  });
});

// Actualizar producto
app.put('/api/productos/:id', esAdminOEmpleado, (req, res) => {
  const id = req.params.id;
  const {
    id_proveedor, id_categoria, nombre, descripcion,
    precio_compra, precio_publico, disponibilidad,
    imagen_URL, cantidad
  } = req.body;

  const sql = `
    UPDATE productos SET 
      id_proveedor = ?, id_categoria = ?, nombre = ?, descripcion = ?, 
      precio_compra = ?, precio_publico = ?, disponibilidad = ?, 
      imagen_URL = ?, cantidad = ?
    WHERE id_producto = ?
  `;

  connection.query(sql, [
    id_proveedor, id_categoria, nombre, descripcion,
    precio_compra, precio_publico, disponibilidad,
    imagen_URL, cantidad, id
  ], (err) => {
    if (err) return res.status(500).send('Error al actualizar el producto');
    res.send('✏️ Producto actualizado correctamente');
  });
});

// Desactivar producto
app.delete('/api/admin/productos/:id', esAdminOEmpleado, (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE productos SET estado = 'Inactivo' WHERE id_producto = ?`;

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Error al desactivar producto');
    res.send('🗑️ Producto desactivado correctamente');
  });
});

// Reactivar producto
app.put('/api/admin/productos/:id/reactivar', esAdminOEmpleado, (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE productos SET estado = 'Activo' WHERE id_producto = ?`;

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).send('Error al reactivar producto');
    res.send('✅ Producto reactivado correctamente');
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
