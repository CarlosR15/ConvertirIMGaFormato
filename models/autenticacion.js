const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

// Autenticacion para protejer vistas
async function autenticar(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        next();

    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(usuario_id) {
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ usuario_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

async function getHash(passwordString) {
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    return await bcrypt.hash(passwordString, saltRounds);
}

async function comparePassword(passwordString, bdHash) {
    const compararHashes = await bcrypt.compare(passwordString, bdHash);
    return compararHashes;
}

module.exports = {
    generateToken,
    getHash,
    comparePassword,
    autenticar
}