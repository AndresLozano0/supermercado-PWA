// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Conexión a MySQL
const connection = require('./conexion');

// Ruta para registrar usuarios
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
    datos.id_rol || 7, // por defecto el rol 7 si no se envía
    datos.hash_contraseña,
    'Activo'
  ];

  connection.query(sql, valores, (error, results) => {
    if (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.send('Usuario registrado con éxito');
    }
  });
});


// Servir archivos HTML y otros estáticos desde una carpeta pública (si quieres)
app.use(express.static('public')); // asegúrate de mover tus HTML allí si quieres usarlos así

// Ruta de prueba para saber que funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

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
  
      // Verifica si la contraseña coincide (por ahora, sin encriptar)
      if (contraseña !== usuario.hash_contraseña) {
        return res.status(401).send('Contraseña incorrecta');
      }
  
      // Si todo está bien:
      res.send('Inicio de sesión exitoso');
    });
  });
  
