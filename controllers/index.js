const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  var usuario = req.session.usuario;
  var usuario_id = req.session.usuario_id;
  var invitado = req.session.invitado;
  res.render('index', {usuario: usuario, usuario_id: usuario_id, invitado: invitado });
});

module.exports = router;