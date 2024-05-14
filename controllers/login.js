const express = require('express');
const router = express.Router();
const { generateToken } = require('../models/autenticacion');
const passport = require('passport');

// rutas publicas
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', { //autentuca que el usuario este logeado 
  failureRedirect: '/login',
}), async (req, res) => {
  // si se autentica correctamente, crea un token JWT
  const token = generateToken(req.user.id);

  //se declara las variables de session usuario con el nombre y id del usuario
  req.session.usuario = req.user.nombre;
  req.session.usuario_id = req.user.id;

  res.cookie('token', token, { httpOnly: true, secure: false }); //primero res.cookie contiene el token JWT generado, "httpOnly: true" hace que la cookie solo se pueda acceder
  //por HTTP y no por JavaScript y secure false indica que no necesita ser segura la conexion para mandar la cookie

  res.redirect('/');
});

module.exports = router;