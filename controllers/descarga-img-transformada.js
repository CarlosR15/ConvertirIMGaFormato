const express = require('express');
const fs = require('fs')
const router = express.Router();

router.post('/', (req, res) => {  
    const path = req.session.pathImgConvSess;
    const pathG = req.session.pathImgGuar;
    // descargar la imagen ya convertida
    res.download(path, (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
        } else {
            // borrar la imagen ya convertida de la carpeta local despues de descargarla
            fs.unlink(path, (err) => {
                if (err) {
                    console.error('Error al borrar el archivo:', err);
                } else {
                    console.log('Archivo borrado exitosamente:', path);
                }
            });

            // borrar la imagen original (no jala porque parece que el pathG se sigue utilizando en algun proceso AAAAAAAAAAAAA[lo mas seguro es que sea por el buffer que se carga en el switch, del archivo uploadimg.js])
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