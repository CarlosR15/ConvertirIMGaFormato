const sharp = require('sharp');

async function convertirPNG(dirIMG) {
    const imageBuffer = await sharp(dirIMG).png().toBuffer();
    
    return imageBuffer;
}

async function convertirWEBP(dirIMG) {
    const imageBuffer = await sharp(dirIMG).webp().toBuffer();
    
    return imageBuffer;
}

async function convertirJPEG(dirIMG) {
    const imageBuffer = await sharp(dirIMG).jpeg().toBuffer();
    
    return imageBuffer;
}

async function convertirGIF(dirIMG) {
    const imageBuffer = await sharp(dirIMG).gif().toBuffer();
    
    return imageBuffer;
}

// const imagePath = './uploads/1714960219245.png'; // Reemplazar con la ruta de la imagen
// convertirJPEG(imagePath)
//     .then((jpegBuffer) => {
//         // Hacer algo con la imagen transformada, como guardarla en disco
//         fs.writeFileSync('imagen_transformada.png', jpegBuffer);
//         console.log('Imagen transformada y guardada como imagen_transformada.png');
//     })
//     .catch((error) => {
//         // Manejar el error si ocurre alguno
//         console.error('Error:', error);
//     });

module.exports = {
    convertirPNG,
    convertirWEBP,
    convertirJPEG,
    convertirGIF
};