const sharp = require('sharp');

async function convertirPNG(dirIMG) { //funcion para convertir la imagen que se obtiene con dirIMG con sharp a PNG
    const imageBuffer = await sharp(dirIMG).png().toBuffer(); //se llama a sharp para transformar la imagen a PNG y lo manda a buffer y lo guar en imageBuffer
    
    return imageBuffer; //retorna el imageBuffer
}

async function convertirWEBP(dirIMG) { //funcion para convertir la imagen que se obtiene con dirIMG con sharp a WEBP
    const imageBuffer = await sharp(dirIMG).webp().toBuffer(); //se llama a sharp para transformar la imagen a WEBP y lo manda a buffer y lo guar en imageBuffer
    
    return imageBuffer; //retorna el imageBuffer
}

async function convertirJPEG(dirIMG) { //funcion para convertir la imagen que se obtiene con dirIMG con sharp a JPEG
    const imageBuffer = await sharp(dirIMG).jpeg().toBuffer(); //se llama a sharp para transformar la imagen a JPEG y lo manda a buffer y lo guar en imageBuffer
    
    return imageBuffer; //retorna el imageBuffer
}

async function convertirGIF(dirIMG) { //funcion para convertir la imagen que se obtiene con dirIMG con sharp a GIF
    const imageBuffer = await sharp(dirIMG).gif().toBuffer(); //se llama a sharp para transformar la imagen a GIF y lo manda a buffer y lo guar en imageBuffer
    
    return imageBuffer; //retorna el imageBuffer
}

module.exports = {
    convertirPNG,
    convertirWEBP,
    convertirJPEG,
    convertirGIF
};