const express = require('express');
const router = express.Router();

// Importa las rutas específicas
const index = require('./index');
const uploadimg = require('./uploadimg');


// Configura las rutas
router.use('/', index);
router.use('/uploadimg', uploadimg);

module.exports = router;