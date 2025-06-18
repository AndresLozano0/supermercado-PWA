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
    if (!usuario) {
        return res.send('Debes iniciar sesión para hacer un pedido');
    }

    const id_producto = req.body.id;
    console.log(`Usuario ${usuario.nombres} quiere pedir el producto ${id_producto}`);
    res.send('Pedido recibido correctamente (simulado)');
});
  
    


  

  
