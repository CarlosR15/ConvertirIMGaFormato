const express = require('express');
const router = express.Router();
const db = require('../bd/callbd');

router.post('/', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        await db.registrarUsuario(nombre, email, password);

        res.redirect('/login')
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error interno del servidor')
    }
});

module.exports = router;