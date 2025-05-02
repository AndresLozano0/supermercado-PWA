const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supermercado'
});

connection.connect((error) => {
    if (error) {
        console.error(' Error de conexión a la base de datos:', error.message);
        return;
    }
    console.log(' Conexión exitosa a la base de datos supermercado.');
 });

 module.exports = connection; 