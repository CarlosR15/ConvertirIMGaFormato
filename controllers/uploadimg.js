const express = require('express');
const router = express.Router();
const fs = require('fs');


//multer para subir imagenes
const multer = require('multer');

//Funciones mias de mi
const { convertirPNG, convertirWEBP, convertirJPEG, convertirGIF } = require('../models/convertirIMGs');
const { guardarIMGsConvertida } = require('../models/guardarIMGs');
const { nombreSinFormato } = require('../models/obetenerNombreIMGs');
const { subirImgInvitado, subirImgUsuario } = require('../bd/callbd');

var numImg = 0; //para poder hacer que tenga nombre unico cada vez que suba una imagen

const storage = multer.diskStorage({ //llamar a multer para  guardar las imagenes
  destination: (req, file, cb) => {
    const folderPath = './imagenes/uploads';

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // crear carpetas anidadas
    }

    cb(null, folderPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${numImg++}-${file.originalname}`) //se suma de uno en uno
  }
});

const upload = multer({ storage }) //llama a multer para subir los files

function verUsuyPrb(req, res) { //se le suma uno a uno al llamar a esta funcion
  req.session.invitado++;
}

router.post('/', upload.single('file'), async (req, res) => { //post para subir la imagen
  if (req.session.invitado > 2) { //comprueba si la variable para los intentos es mayor a 2 (ya que es su ultima oportunidad), y si ya no tiene oportunidadess, lo manda al login
    return res.redirect('/login');
  }

  // try catch, ya que al darle al boton subir, siempre intenta el post, con este try se obliga a que si no se puede genera la variable de session pathImgGuardar se regrese al inicio o index
  try { 
    //se declara una variable de session del path de la imagen guardada
    req.session.pathImgGuar = req.file.path;
  } catch (err) {
    console.log('No selecciono una File');
    return res.redirect('/');
  }

  //se declaran las variables para mandar a la vase de datos
  const contenido_base64 = fs.readFileSync(req.file.path, 'base64');
  const nombre_archivo = req.file.originalname;
  const tipo_mimetype = req.file.mimetype;
  const id_usu = req.session.usuario_id;
  const cookie = req.headers.cookie;

  //se declaran las variables que se  utilizara para utilizar las funciones declaradas en los archivos convertir y guardar IMGs
  const { tiposDeArchivo } = req.body;
  var bufferIMG;
  var imagePath = req.file.path;
  var pathImageConvertida = '';
  var base64C;
  var mimetypeC;
  var nombreArchivoC;
  //switch que recibe el tipo de archivo desde la vista para saber a que se va a convertir la imagen obtenida
  switch (tiposDeArchivo) {
    case 'png':
      //se utilizan las variables y funciones para tranformar la imagen a lo que pidio el usuario
      bufferIMG = await convertirPNG(imagePath);
      nombreArchivoSinFormato = nombreSinFormato(imagePath) + '.png';
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreArchivoSinFormato);
      req.session.pathImgConvSess = pathImageConvertida;

      // realizar la conversión a b64
      base64C = bufferIMG.toString('base64');

      // obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      //se sube a la base de datos
      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'jpeg':
      //se utilizan las variables y funciones para tranformar la imagen a lo que pidio el usuario
      bufferIMG = await convertirJPEG(imagePath);
      nombreArchivoSinFormato = nombreSinFormato(imagePath) + '.jpeg';
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreArchivoSinFormato);
      req.session.pathImgConvSess = pathImageConvertida;

      // realizar la conversión a b64
      base64C = bufferIMG.toString('base64');

      // obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();
      
      //se sube a la base de datos
      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'webp':
      //se utilizan las variables y funciones para tranformar la imagen a lo que pidio el usuario
      bufferIMG = await convertirWEBP(imagePath);
      nombreArchivoSinFormato = nombreSinFormato(imagePath) + '.webp';
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreArchivoSinFormato);
      req.session.pathImgConvSess = pathImageConvertida;

      // realizar la conversión a b64
      base64C = bufferIMG.toString('base64');

      // obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      //se sube a la base de datos
      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    case 'gif':
      //se utilizan las variables y funciones para tranformar la imagen a lo que pidio el usuario
      bufferIMG = await convertirGIF(imagePath);
      nombreArchivoSinFormato = nombreSinFormato(imagePath) + '.gif';
      pathImageConvertida = await guardarIMGsConvertida(bufferIMG, nombreArchivoSinFormato);
      req.session.pathImgConvSess = pathImageConvertida;

      // realizar la conversión a b64
      base64C = bufferIMG.toString('base64');

      // obtener el mimetype
      mimetypeC = require('mime-types').lookup(pathImageConvertida);

      // obtener el nombre del archivo
      nombreArchivoC = pathImageConvertida.split('/').pop();

      //se sube a la base de datos
      await verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
      verUsuyPrb(req, res);
      break;

    default:
      const pathG = req.session.pathImgGuar;
      fs.unlink(pathG, (err) => {
        if (err) {
            console.error('Error al borrar pathG:', err);
        } else {
            console.log('pathG borrado exitosamente:', pathG);
        }
      });
      console.log('Seleccione una imagen');
      break;
  }
  res.redirect('/');

});

//funcion para saber si el hay un usuario logeado para saber a que tabla se va mandar la imagen
async function verifUsuLogged(id_usu, cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC) {
  if (id_usu) { //verifica si hay usuario logeado y si hay se manda a la tabla de usuarios
    subirImgUsuario(id_usu, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
  } else { // y si no, se manda a la tabla de invitados
    subirImgInvitado(cookie, tipo_mimetype, contenido_base64, nombre_archivo, mimetypeC, base64C, nombreArchivoC);
  }  
}

module.exports = router;