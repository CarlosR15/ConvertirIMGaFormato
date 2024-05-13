const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {  
    const path = req.session.pathImgConvSess;
    const pathG = req.session.pathImgGuar;
    // Descargar la imagen ya convertida
    res.download(path, (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
        } else {
            // Borrar la imagen de la carpeta local después de descargarlo
            fs.unlink(path, (err) => {
                if (err) {
                    console.error('Error al borrar el archivo:', err);
                } else {
                    console.log('Archivo borrado exitosamente:', path);
                }
            });

            // Borrar la imagen original
            fs.unlink(pathG, (err) => {
                if (err) {
                    console.error('Error al borrar pathG:', err);
                } else {
                    console.log('pathG borrado exitosamente:', pathG);
                }
            });
        }
    });
});

module.exports = router;