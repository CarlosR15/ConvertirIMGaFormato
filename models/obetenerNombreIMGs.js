//funcion para obtener el nombre sin el formato
function nombreSinFormato(rutaArchivo) {
    var nombreArchivo = rutaArchivo.split("\\").pop().split("/").pop(); //utiliza split primero para "nombre.algo"

    var ultimoPunto = nombreArchivo.lastIndexOf(".");// y por ultimo vuelve a utilizar el split para  ver el ".algo"

    if (ultimoPunto !== -1 && ultimoPunto !== 0) { //verifica si encontro un punto en el nombre del archivo
        return nombreArchivo.slice(0, ultimoPunto); //si lo verifica, devuelve una cadena del primer caracter hasta antes del ultimo punto
    } else {
        return nombreArchivo; //si no encuentra ".algo" lo manda tal cual
    }
}

module.exports = {
    nombreSinFormato
};