const express = require('express');
const router = express.Router();

// rutas publicas para el registro
router.get('/', (req, res) => {
  res.render('register');
});

module.exports = router;