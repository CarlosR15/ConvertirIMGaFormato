const fs = require('fs'); // se llama a fs

async function guardarIMGsConvertida(imageBuffer, nombreSinFormato) { // se llama al  imageBuffer  y nombreSinFormato, que se consiguen en otra funcion
    const folderPath = './imagenes/downloads'; //se crea la constante folderPath con el path al que se va a  pasar la imagen convertida

    if (!fs.existsSync(folderPath)) { // verifica que exista el path folder, si no lo crea
        fs.mkdirSync(folderPath, { recursive: true }); // Usamos { recursive: true } para crear carpetas anidadas
    }

    const filePath = `${folderPath}/${nombreSinFormato}`;// al recibir nobreSinFormato y lo combina con el folderPath

    fs.writeFile(filePath, imageBuffer, (err) => { // se verifica que se haya guardado la imagen convertida
        if (err) {
            console.error('Error al guardar la imagen:', err);
        } else {
            console.log('La imagen se ha guardado correctamente en:', filePath);// confirmacion de que se guardo la imagen
        }
    });
    return filePath; //regresa el filePath para utilizarlo
}

module.exports = {
    guardarIMGsConvertida
};