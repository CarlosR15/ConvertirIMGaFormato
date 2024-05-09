const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

async function authenticate(req, res, next) {

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
    comparePassword
}