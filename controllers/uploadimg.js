const express = require('express');
const router = express.Router();
const fs = require('fs');


//multer para subir imagenes
const multer = require('multer');

//Funciones mias de mi
const { convertirPNG, convertirWEBP, convertirJPEG, convertirGIF } = require('../models/convertirIMGs');
const { guardarIMGsConvertida, convertB64C } = require('../models/guardarIMGs');
const { nombreSinFormato } = require('../models/obetenerNombreIMGs');
const { subirImgInvitado, subirImgUsuario } = require('../bd/callbd');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = './imagenes/uploads';

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Crear carpetas anidadas
    }

    cb(null, folderPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  }
});

const upload = multer({ storage })

function verUsuyPrb(req, res) {
  req.session.invitado++;
}

router.post('/', upload.single('file'), async (req, res) => {
  if (req.session.invitado > 2) {
    return res.redirect('/login');
  }

  req.session.pathImgGuar = req.file.path;

  const contenido_base64 = fs.readFileSync(req.file.path, 'base64');
  const nombre_archivo = req.file.originalname;
  const tipo_mimetype = req.file.mimetype;
  const id_usu = req.session.usuario_id;
  const cookie = req.headers.cookie;

  const { tiposDeArchivo } = req.body;
  var bufferIMG;
  var imagePath = req.file.path;
  var pathImageConvertida = '';
  var base64C;
  var mimetypeC;
  var nombreArchivoC;
  switch (tiposDeArchivo) {
    case 'png':
      bufferIMG = await convertirPNG(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath) + '.png');
      req.session.pathImgConvSess = pathImageConvertida;
      base64C = await convertB64C(pathImageConvertida);
      // Obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // Obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'jpeg':
      bufferIMG = await convertirJPEG(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath) + '.jpeg');
      req.session.pathImgConvSess = pathImageConvertida;
      base64C = await convertB64C(pathImageConvertida);
      // Obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // Obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'webp':
      bufferIMG = await convertirWEBP(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath) + '.webp');
      req.session.pathImgConvSess = pathImageConvertida;
      base64C = await convertB64C(pathImageConvertida);
      // Obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // Obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'gif':
      bufferIMG = await convertirGIF(imagePath);
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreSinFormato(imagePath) + '.gif');
      req.session.pathImgConvSess = pathImageConvertida;
      base64C = await convertB64C(pathImageConvertida);
      // Obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // Obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    default:
      console.log('Seleccione una imagen');
      break;
  }
  res.redirect('/');

});

async function verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC) {
  if (id_usu) {
    subirImgUsuario(id_usu, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
  } else {
    subirImgInvitado(cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
  }  
}

module.exports = router;