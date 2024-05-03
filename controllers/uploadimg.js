const express = require('express');
const router = express.Router();

//multer para subir imagenes
const multer = require('multer');

//sharp para lo de detectar el que tipo de imagen
const sharp = require('sharp')

//probar hacerlo async para hacer lo de abajo await
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb (null, './uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}.${ext}`)
  }
})

//hacer esto await
const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
  res.redirect('/');
});

module.exports = router;