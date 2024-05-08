const mysql2 = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Obtener una conexión del pool
function conexionALaBase() {
    return pool.promise().getConnection();
}

console.log(conexionALaBase());
// module.exports = {
//     conexionALaBase
// };