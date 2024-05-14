const express = require('express');
const router = express.Router();
const bdIMG = require('../bd/callbd');
const reqIniSes = require('../models/autenticacion');

// rutas publicas
router.get('/', reqIniSes.autenticar, async (req, res) => {
    try {
        // obtener el ID del usuario de la sesion
        const usuarioId = req.session.usuario_id;

        // obtener las imágenes del usuario
        const imagenes = await bdIMG.obtenerImagenPorId(usuarioId);

        // renderizar la plantilla con las imagenes obtenidas
        res.render('Imagenes-en-bd', { imagenes });
    } catch (error) { //captura el error y lo imprime en la consola
        console.error('Error al obtener imágenes del usuario:', error);
    }
});

module.exports = router;