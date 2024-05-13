const express = require('express');
const router = express.Router();
const bdIMG = require('../bd/callbd');
const reqIniSes = require('../models/autenticacion');

// Rutas públicas
router.get('/', reqIniSes.autenticar, async (req, res) => {
    try {
        // Obtener el ID del usuario de la sesión
        const usuarioId = req.session.usuario_id;

        // Obtener las imágenes del usuario
        const imagenes = await bdIMG.obtenerImagenPorId(usuarioId);

        // Renderizar la plantilla con las imágenes obtenidas
        res.render('Imagenes-en-bd', { imagenes });
    } catch (error) {
        console.error('Error al obtener imágenes del usuario:', error);
    }
});

module.exports = router;