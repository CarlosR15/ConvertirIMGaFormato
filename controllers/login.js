const express = require('express');
const router = express.Router();
const { generateToken } = require('../models/autenticacion');
const passport = require('passport');

// Rutas públicas
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
}), async (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = generateToken(req.user.id);

  req.session.usuario = req.user.nombre;

  res.cookie('token', token, { httpOnly: true, secure: false });

  res.redirect('/');
});

module.exports = router;