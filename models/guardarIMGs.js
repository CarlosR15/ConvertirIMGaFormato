const fs = require('fs');

async function guardarIMGsConvertida(imageBuffer, nombreSinFormato) {
    const folderPath = './imagenes/downloads';

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Usamos { recursive: true } para crear carpetas anidadas
    }

    const filePath = `${folderPath}/${nombreSinFormato}`;

    fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) {
            console.error('Error al guardar la imagen:', err);
        } else {
            console.log('La imagen se ha guardado correctamente en:', filePath);
        }
    });
    return filePath;
}

function convertB64C(pathImageConvertida) { //intentar fucionar esta cosa con la de arriba para evitar el promise, y no tener que cargar de nuevo el path de la imagen convertida salbenme dios mio
    return new Promise((resolve, reject) => {
        fs.readFile(pathImageConvertida, (err, data) => {
            if (err) {
                console.error('Error al leer la imagen:', err);
                reject(err);
                return;
            }

            // Convierte el buffer de la imagen a una cadena Base64
            const base64String = data.toString('base64');

            // Resuelve la promesa con la cadena Base64
            resolve(base64String);
        });
    });
}

module.exports = {
    guardarIMGsConvertida,
    convertB64C
};