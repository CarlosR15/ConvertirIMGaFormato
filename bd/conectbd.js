const mysql2 = require('mysql2');
const dotenv = require('dotenv').config();

//crea el pool para conectarse a la base de datos, esto a  traves de lo declarado en el env
const pool = mysql2.createPool({
    //se declaran las cosas desde el .env
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true, // indica si el pool tiene que esperar por una conexion, en este caso si
    connectionLimit: 10, // numero maximo de conexiones que puede soportar el pool
    queueLimit: 0 //limite de la cola de  espera, en este caso no hay
});

// obtener una conexión del pool
function conexionALaBase() {
    return pool.promise().getConnection();
}

module.exports = {
    conexionALaBase
};