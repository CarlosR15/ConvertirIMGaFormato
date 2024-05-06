const fs = require('fs');

async function guardarIMGsConvertida(imageBuffer, nombreSinFormato) {
    fs.writeFile(`./imagenes/download/${nombreSinFormato}`, imageBuffer, (err) => {
        if (err) {
            console.error('Error al guardar la imagen:', err);
        } else {
            console.log('La imagen se ha guardado correctamente en:', `./imagenes/download/${nombreSinFormato}`);
        }
    });
    return `./imagenes/download/${nombreSinFormato}`;
}



module.exports = {
    guardarIMGsConvertida
};