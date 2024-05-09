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

async function obtenerPorNombre(nombre) {
    const bd = await conexion.conexionALaBase();
    try {
        const [results] = await bd.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    } finally {
        bd.release(); // Liberar la conexión al finalizar
    }
}

async function obtenerPorId(id) {
    const bd = await conexion.conexionALaBase();
    try {
        const [results] = await bd.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } finally {
        bd.release(); // Liberar la conexión al finalizar
    }
}

module.exports = {
    registrarUsuario,
    obtenerPorNombre,
    obtenerPorId
};