const express = require('express');
const router = express.Router();

// Importa las rutas específicas
const index = require('./index');
const uploadimg = require('./uploadimg');
const downloadimg = require('./descarga-img-transformada');
const registro = require('./register');
const registrarUser = require('./register-user');
const login = require('./login');
const obtenerimg = require('./obtenerimg');


// Configura las rutas
router.use('/', index);
router.use('/uploadimg', uploadimg);
router.use('/descarga-img-transformada', downloadimg);
router.use('/register', registro);
router.use('/register-user', registrarUser);
router.use('/login', login);
router.use('/obtenerimg', obtenerimg);

module.exports = router;