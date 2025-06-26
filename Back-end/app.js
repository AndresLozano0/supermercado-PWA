// Importación del módulo express
const express = require('express');
const app = express();
const port = 3000;

// Importación del archivo de conexión a MySQL
const connection = require('./conexion');

//importacion de session
const session = require('express-session');

//Configuración de sesión (debe ir antes de las rutas)
//configuracion express-session debe ir despues de iniciar "express()" y antes de las rutas
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

// Ruta de prueba para saber que funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

// Ruta para registrar usuarios nuevos
app.post('/registro', (req, res) => {
  const datos = req.body; // Extraer datos del cuerpo de la solicitud

  // Consulta SQL para insertar un nuevo usuario en la tabla "usuario"
  const sql = `
    INSERT INTO usuario 
    (nombres, apellidos, sexo, tipo_documento, numero_documento, fecha_nacimiento, correo, celular, direccion, id_rol, hash_contraseña, fecha_creación, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
  `;

  // Arreglo con los valores que se insertarán (en el mismo orden de la consulta SQL)
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
    datos.id_rol || 7, // // Si no se especifica el rol, se asigna 7 por defecto
    datos.hash_contraseña,
    'Activo' // Estado inicial del usuario
  ];

   // Ejecuta la consulta
  connection.query(sql, valores, (error, results) => {
    if (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.send('Usuario registrado con éxito');
    }
  });
});

//Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { contacto, contraseña } = req.body;// Extrae el correo o celular, y la contraseña

    // Consulta SQL para buscar al usuario por correo o celular
const sql = `
      SELECT * FROM usuario
      WHERE (correo = ? OR celular = ?) AND estado = 'Activo'
    `;
  
// Ejecuta la consulta con el contacto duplicado (porque puede ser correo o celular)
    connection.query(sql, [contacto, contacto], (error, results) => {
      if (error) {
        console.error('Error en login:', error);
        return res.status(500).send('Error en el servidor');
      }
  
// Si no se encuentra ningún usuario activo
      if (results.length === 0) {
        return res.status(401).send('Usuario no encontrado o inactivo');
      }
  
      const usuario = results[0];

            // Verifica si la contraseña coincide (por ahora, sin encriptar)
      if (contraseña !== usuario.hash_contraseña) {
        return res.status(401).send('Contraseña incorrecta');
      }
      req.session.usuario = usuario;
    
      // Si todo está bien:
      res.send('Inicio de sesión exitoso');
    });
  });

  //Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

// 📦 Ruta para mostrar productos desde la base de datos
app.get('/api/productos', (req, res) => {
  const sql = 'SELECT * FROM productos'; // Asegúrate de que esta tabla exista

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', error);
      return res.status(500).send('Error en el servidor');
    }

    // Devuelve los productos como JSON
    res.json(results);
  });
});

// 🛒 Ruta para hacer un pedido (requiere sesión)
app.post('/pedir', (req, res) => {
    const usuario = req.session.usuario;
    const id_producto = req.body.id;
    if (!usuario) {
        return res.send('Debes iniciar sesión para hacer un pedido');
    }

    const sql = `INSERT INTO pedidos (id_usuario, id_producto) VALUES (?, ?)`;
    connection.query(sql, [usuario.id_usuario, id_producto], (err, result) => {
        if (err) {
            console.error('Error al registrar pedido:', err);
            return res.status(500).send('Error al hacer el pedido');
        }

        res.send('Pedido registrado correctamente ✅');
    });
});   

// Ruta para consultar pedidos del usuario autenticado
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
// ✅ Ruta para verificar si el usuario ha iniciado sesión
app.get('/usuario', (req, res) => {
  if (req.session && req.session.usuario) {
    res.json({ autenticado: true, usuario: req.session.usuario });
  } else {
    res.json({ autenticado: false });
  }
});

// Ruta para confirmar un pedido (desde el carrito)
app.post('/confirmar-pedido', (req, res) => {
  const usuario = req.session.usuario;
  const productos = req.body.productos;

  if (!usuario) {
    return res.status(401).send('Debes iniciar sesión para confirmar el pedido');
  }

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).send('No hay productos para confirmar');
  }

  // Paso 1: Insertar el pedido principal
  const sqlInsertPedido = `INSERT INTO pedidos (id_usuario, fecha, estado) VALUES (?, NOW(), 'pendiente')`;

  connection.query(sqlInsertPedido, [usuario.id_usuario], (err, resultado) => {
    if (err) {
      console.error('❌ Error al insertar en pedidos:', err);
      return res.status(500).send('Error al confirmar el pedido');
    }

    const idPedido = resultado.insertId; // ID del pedido generado

    // Paso 2: Insertar detalles del pedido (una fila por producto)
    const sqlInsertDetalle = `
      INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, precio_unitario)
      VALUES ?
    `;

    const valores = productos.map(p => [
      idPedido,
      p.id_producto,
      p.cantidad,
      p.precio
    ]);

    connection.query(sqlInsertDetalle, [valores], (err2) => {
      if (err2) {
        console.error('❌ Error al insertar en pedido_detalle:', err2);
        return res.status(500).send('Error al registrar productos del pedido');
      }

      res.send('✅ Pedido confirmado correctamente 🧾');
    });
  });
});




    


  

  
