const conexion = require('./conectbd');

//funciones para llamar a la base de datos

//funcion para registrar un usuario en la bd
async function registrarUsuario(nombre, email, contrasenia) {
    // conexion
    const bd = await conexion.conexionALaBase();
    try {
        // consulta
        await bd.query('INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)', 
        [
            //lo que obtiene para mandar a la bd
            nombre,
            email,
            contrasenia
        ]);
        console.log('usuario registrado AÑA');
        
    } catch (error) {
        console.log('Se experimento un destos faios ' + error);
    } finally {
        bd.release(); // liberar la conexion al finalizar
    }
}

//funcion para obtener  las imagenes por el id de un usuario
async function obtenerImagenPorId(usuarioId) {
    //conexion
    const bd = await conexion.conexionALaBase();
    try {
        //consulta
        const [results] = await bd.query('SELECT * FROM registroImgUsuariosRegistrados WHERE usuario_id = ?', [usuarioId]);
        return results; //retorna los resultados
    } catch (error) {
        console.error('Error al obtener usuario por imagenDes:', error);
        throw error;
    } finally {
        bd.release(); // liberar la conexion al finalizar
    }
}

//obtener el nombre del usuario de la tabla usuiarios
async function obtenerPorNombre(nombre) {
    //conexion
    const bd = await conexion.conexionALaBase();
    try {
        //consulta
        const [results] = await bd.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        return results[0]; //retorna los resultados
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    } finally {
        bd.release(); // liberar la conexion al finalizar
    }
}

//obtener  el id del usuario en la tabla usuarios
async function obtenerPorId(id) {
    //conexion
    const bd = await conexion.conexionALaBase();
    try {
        //consulta
        const [results] = await bd.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0]; //retorna los resultados
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } finally {
        bd.release(); // liberar la conexion al finalizar
    }
}

//funcion para subir imagenes a la bd de un invitado
async function subirImgInvitado(cookie, tipoImgSC, b64SC, nombreSC, tipoImgC, b64C, nombreC) {
    //conexion
    const bd = await conexion.conexionALaBase();
    try {
        //consulta
        await bd.query('INSERT INTO registroImgInvitados (cookie, tipoImgSinConv, b64ImgSinConv, nomImgSinConv, tipoImgConv, b64ImgConv, nomImgConv) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
            //lo que obtiene para mandar a la bd
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
        bd.release(); // liberar la conexion al finalizar
    }
}

//funcion para subir imagenes a la bd de un usuario logeado
async function subirImgUsuario(usuario_id, tipoImgSC, b64SC, nombreSC, tipoImgC, b64C, nombreC) {
    //conexion
    const bd = await conexion.conexionALaBase();
    try {
        //consulta
        await bd.query('INSERT INTO registroImgUsuariosRegistrados (usuario_id, tipoImgSinConv, b64ImgSinConv, nomImgSinConv, tipoImgConv, b64ImgConv, nomImgConv) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
            //lo que obtiene para mandar a la bd
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
        bd.release(); // liberar la conexion al finalizar
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