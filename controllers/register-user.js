const express = require('express');
const router = express.Router();
const db = require('../bd/callbd');
const { getHash } = require('../models/autenticacion');

router.post('/', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const existeUsuario = await db.obtenerPorNombre(nombre); // falta hacer obtener por nombre en la bd
        if (existeUsuario) {
            return res.status(400).send('El usuario ya está registrado');
        }

        const contraseñaHasheada = await getHash(password);

        await db.registrarUsuario(nombre, email, contraseñaHasheada);

        res.redirect('/login')
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error interno del servidor')
    }
});

module.exports = router;