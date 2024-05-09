const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  var usuario = req.session.usuario;
  res.render('index', {usuario: usuario});
});

module.exports = router;