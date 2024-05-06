const express = require('express');
const router = express.Router();

// Importa las rutas específicas
const index = require('./index');
const uploadimg = require('./uploadimg');
const downloadimg = require('./descarga-img-transformada');


// Configura las rutas
router.use('/', index);
router.use('/uploadimg', uploadimg);
router.use('/descarga-img-transformada', downloadimg);

module.exports = router;