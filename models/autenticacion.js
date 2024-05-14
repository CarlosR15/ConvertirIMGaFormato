const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

// autenticacion para protejer vistas
async function autenticar(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        next();

    } catch (err) {
        // si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// funcion para generar un token JWT
function generateToken(usuario_id) {
    // crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ usuario_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

//funcion para hashear la contraseña
async function getHash(passwordString) {
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS); //hashea dependiendo  de salt_rounds que se declara en .env
    return await bcrypt.hash(passwordString, saltRounds); // se hashea con bycript.hash utilizando la passswodString obtenida en el form y con los saltos del env
}

//funcion para comparar la contraseña hasehada con la de 
async function comparePassword(passwordString, bdHash) {
    const compararHashes = await bcrypt.compare(passwordString, bdHash); //se compara con bycript.compare la passswordString y el bdHash que se encuentra en la base de datos
    return compararHashes; //retorna true o false, dependiendo de que dio la comparacion
}

module.exports = {
    generateToken,
    getHash,
    comparePassword,
    autenticar
}