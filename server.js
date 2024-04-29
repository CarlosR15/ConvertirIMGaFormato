// Medios de inicializacion de las librerias
const express = require('express');
const app = express();


    app.get('/', (req, res) => {
        res.send('Buenas noches viva dios, y asi cosas');
    });
// Puerto en el que escucha el servidor y se muestra
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});