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
    } finally {
        bd.release(); // Liberar la conexión al finalizar
    }
}

async function obtenerImagenPorId(usuarioId) {
    const bd = await conexion.conexionALaBase();
    try {
        const [results] = await bd.query('SELECT * FROM registroImgUsuariosRegistrados WHERE usuario_id = ?', [usuarioId]);
        return results;
    } catch (error) {
        console.error('Error al obtener usuario por imagenDes:', error);
        throw error;
    } finally {
        bd.release(); // Liberar la conexión al finalizar
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

async function subirImgInvitado(cookie, tipoImgSC, b64SC, nombreSC, tipoImgC, b64C, nombreC) {
    // Conexion
    const bd = await conexion.conexionALaBase();
    try {
        // consulta
        await bd.query('INSERT INTO registroImgInvitados (cookie, tipoImgSinConv, b64ImgSinConv, nomImgSinConv, tipoImgConv, b64ImgConv, nomImgConv) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
            cookie,
            tipoImgSC,
            b64SC,
            nombreSC,
            tipoImgC,
            b64C,
            nombreC
        ]);
        console.log('Imagen del invitado fue subida correctamente a la bd');
        
    } catch (error) {
        console.log('Se experimento un destos faios ' + error);
    } finally {
        bd.release(); // Liberar la conexión al finalizar
    }
}

async function subirImgUsuario(usuario_id, tipoImgSC, b64SC, nombreSC, tipoImgC, b64C, nombreC) {
    // Conexion
    const bd = await conexion.conexionALaBase();
    try {
        // consulta
        await bd.query('INSERT INTO registroImgUsuariosRegistrados (usuario_id, tipoImgSinConv, b64ImgSinConv, nomImgSinConv, tipoImgConv, b64ImgConv, nomImgConv) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
            usuario_id,
            tipoImgSC,
            b64SC,
            nombreSC,
            tipoImgC,
            b64C,
            nombreC
        ]);
        console.log('Imagen del usuario fue subida correctamente a la bd');
        
    } catch (error) {
        console.log('Se experimento un destos faios ' + error);
    } finally {
        bd.release(); // Liberar la conexión al finalizar
    }
}


module.exports = {
    registrarUsuario,
    obtenerPorNombre,
    obtenerPorId,
    subirImgInvitado,
    subirImgUsuario,
    obtenerImagenPorId
};