const connection = require('../bd/conectbd');
const db = connection.conexionALaBase();

async function registrarUsuario(nombre, email, password) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
            [nombre, email, password],
            (err, results) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Usuario insertado correctamente');
                resolve();
            }
        });
    });
}

module.exports = {
    registrarUsuario
};