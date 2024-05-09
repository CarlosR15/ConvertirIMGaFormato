const conexion = require('./conectbd');

async function registrarUsuario(nombre, email, contrasenia) {
    // Conexion
    const bd = await conexion.conexionALaBase();
    try {
        // consulta
        await bd.query('INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)', 
        [
            nombre,
            email,
            contrasenia
        ]);
        console.log('usuario registrado AÑA');
        
    } catch (error) {
        console.log('Se experimento un destos faios ' + error);
    }
}

module.exports = {
    registrarUsuario
};