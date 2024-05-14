const express = require('express');
const router = express.Router();

// rutas publicas
router.get('/', (req, res) => {
  var usuario = req.session.usuario; // se declara la  variable usuario con la variable de session del usuario
  var usuario_id = req.session.usuario_id; // se declara la  variable usuario_id con la variable de session del usuario_id (pal id pues)
  var invitado = req.session.invitado; // se declara la  variable invitado con la variable de session del invitado que se declaro en el server
  res.render('index', {usuario: usuario, usuario_id: usuario_id, invitado: invitado }); //renderiza la vista index, y le pasa  las variables locales
});

module.exports = router;