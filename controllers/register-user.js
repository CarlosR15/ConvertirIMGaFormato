const express = require('express');
const router = express.Router();
const db = require('../bd/callbd');
const { getHash } = require('../models/autenticacion');

// ruta para llamar y guardar en base de datos
router.post('/', async (req, res) => {
    const { nombre, email, password } = req.body; // se declara las variables nombre, email y password de body

    try {
        const existeUsuario = await db.obtenerPorNombre(nombre); // verifica si existe el usuario, llamando a la base de datos 
        if (existeUsuario) { //verifica si existe el usuario
            return res.status(400).send('El usuario ya está registrado'); //da el mensaje de usuario ya registrado ya que ya existe en la base de datos
        }

        const contraseñaHasheada = await getHash(password); //manda la contraseña obtenida y la manda a hashear con la funcion getHash y la guarda en contraseña hasheada

        await db.registrarUsuario(nombre, email, contraseñaHasheada); // llama a  registrarUsuario para guardar el nombre, email y contraseña ya hasheada en la base de datos

        res.redirect('/login') // y lo manda al login
    } catch (error) { // si hay un error lo captura y lo manda en consola
        console.error(error.message)
        res.status(500).send('Error interno del servidor')
    }
});

module.exports = router;