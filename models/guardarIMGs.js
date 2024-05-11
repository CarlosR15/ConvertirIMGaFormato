const fs = require('fs');

async function guardarIMGsConvertida(imageBuffer, nombreSinFormato) {
    fs.writeFile(`./imagenes/downloads/${nombreSinFormato}`, imageBuffer, (err) => {
        if (err) {
            console.error('Error al guardar la imagen:', err);
        } else {
            console.log('La imagen se ha guardado correctamente en:', `./imagenes/downloads/${nombreSinFormato}`);
        }
    });
    return `./imagenes/downloads/${nombreSinFormato}`;
}



module.exports = {
    guardarIMGsConvertida
};