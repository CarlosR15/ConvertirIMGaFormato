// Medios de inicializacion de las librerias
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();
const path = require('path');
const router = require('./controllers/routes');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(cookieParser());

dotenv.config();

//Funciones mias de mi
const { obtenerPorNombre, obtenerPorId } = require('./bd/callbd');
const { comparePassword } = require('./models/autenticacion');

// Configurar middleware para manejar sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Esto lo que hace esque si detecta que no hay usuario ni id de usuario ni la misma variable por dentro crea una variable de session para el contador
app.use(async (req, res, next) => {
  if (!req.session.usuario && !req.session.usuario_id && !req.session.invitado) {
    req.session.invitado = 0;
  }
  next();
});

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await obtenerPorNombre(username);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await comparePassword(password, user.contrasenia);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

//serializar el usuario 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserealizar al usuario
passport.deserializeUser(async (id, done) => {
  await obtenerPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});

//Esto sirve para poder utilizar las URL como cadenas de consulta
app.use(express.urlencoded({ extended: true }));

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use('/', router); //ruta de la página principal

//Ruta para cerrar sesión
app.get('/logout', async (req, res) => {
  await req.logout(async (err) => {
    if (err) {
      // Manejo del error, si es necesario
      console.error(err);
    }
    //req.session.destroy(); // Eliminar la sesión completa
    await req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
      }
      console.log('Sesión finalizada correctamente');
    });
    // Eliminar el contenido del almacén de sesiones
    await req.sessionStore.clear((err) => {
      if (err) {
        console.error('Error al limpiar el almacén de sesiones:', err);
      }
      console.log('Alamcén de sesiones finalizada correctamente');
    });
    res.clearCookie('token');
    res.redirect('/'); // Redirigir a la página principal
  });
});

// Puerto en el que escucha el servidor y se muestra
const PORT = 3000;  
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});