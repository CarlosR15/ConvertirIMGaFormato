function nombreSinFormato(rutaArchivo) {
    var nombreArchivo = rutaArchivo.split("\\").pop().split("/").pop();

    var ultimoPunto = nombreArchivo.lastIndexOf(".");

    if (ultimoPunto !== -1 && ultimoPunto !== 0) {
        return nombreArchivo.slice(0, ultimoPunto);
    } else {
        return nombreArchivo;
    }
}

module.exports = {
    nombreSinFormato
};