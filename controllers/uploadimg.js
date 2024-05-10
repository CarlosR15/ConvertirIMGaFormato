const express = require('express');
const router = express.Router();

//multer para subir imagenes
const multer = require('multer');

//Funciones mias de mi
const { convertirPNG, convertirWEBP, convertirJPEG, convertirGIF } = require('../models/convertirIMGs');
const { guardarIMGsConvertida } = require('../models/guardarIMGs');
const { nombreSinFormato } = require('../models/obetenerNombreIMGs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './imagenes/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage })

router.post('/', upload.single('file'), async (req, res) => {
  const { tiposDeArchivo } = req.body;
  var bufferIMG;
  var imagePath = req.file.path;
  var pathImageConvertida = '';
  switch (tiposDeArchivo) {
    case 'png':
      bufferIMG = await convertirPNG(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath)+'.png');
      req.session.pathImgConvSess = pathImageConvertida;
      break;

    case 'jpeg':
      bufferIMG = await convertirJPEG(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath)+'.jpeg');
      req.session.pathImgConvSess = pathImageConvertida;
      break;

    case 'webp':
      bufferIMG = await convertirWEBP(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath)+'.webp');
      req.session.pathImgConvSess = pathImageConvertida;
      break;

    case 'gif':
      bufferIMG = await convertirGIF(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath)+'.gif');
      req.session.pathImgConvSess = pathImageConvertida;
      break;

    default:
      console.log('Paso algo culero');
      break;
  }
  res.redirect('/');
});

module.exports = router;