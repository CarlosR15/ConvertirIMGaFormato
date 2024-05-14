# Proyecto node js Carlos Rubén Romellón IGTI

## Instrucciones y comentarios

Se debera tener node js instalado

Se deberan tener instaladas las siguientes dependencias
    "bcrypt"
    "cookie-parser"
    "dotenv"
    "express"
    "express-session"
    "jsonwebtoken"
    "multer"
    "mysql2"
    "passport"
    "passport-local"
    "pug" 
    "sass"
    "sharp"

De igual forma las depedencias dev
    "nodemon"
    "npm-run-all"

Todas estas aparecen en el archivo package.json.

### instalación

Se puede hacer la instalación manual, o con el comando:

`npm i bcrypt cookie-parser dotenv express express-session jsonwebtoken multer mysql2 passport passport-local pug sass sharp`

y las de desarrollador con el comando.

`npm i nodemon npm-run-all -D`

De igual manera, se tendra que crear una base de datos en MySQL workbench
con el codigo sql que se encuentra dentro de laa carpeta llamada "bd".

Y si se está duplicando de github, se tiene que crear un archivo llamado .env en la carpeta padre, o dentro de  la carpeta convertirformato, en la que se tiene que escribir lo siguiente:
////////////////////////////////////////////////
ACCESS_TOKEN_SECRET = 'cualquiercosaquequierascomotoken'

MYSQL_HOST = 'localhost'
MYSQL_PORT = '3306'

MYSQL_USER = 'root'
MYSQL_PWD = '##contraseña1234##'
MYSQL_DATABASE = 'convertIMGaForm_db'

PASSWORD_SALT_ROUNDS = 10
/////////////////////////////////////////////////

se puede modificar el access_token_secret por el que uno quiera, y si se copio la base de datos en mysql workbench, se tiene que adaptar el host, el puerto (port), el usuario (user), la contraseña del usuario (pwd), y en este caso el nombre de la base de datos se queda igual, ya que en el sql se crea la base de datos con ese nombre
## Comentarios

En la parte de conversiones, no se incluyo el jpg, ya que al llamar el mimeType de una imagen JPG, se te regresa un image/jpeg, asi que se tomo en cuenta que las imagenes jpg son jpeg.

Y en el tema de la conversion, es necesario las carpetas imagenes/uploads y imagenes/downloads, estas se creen con la libreria "fs", que una que ya tiene el mismo node js de manera predeterminada, en cuanto a subir las imagenes, estas si se suben en base64, y al final se lanza una funcion para eliminar las imagenes de las carpetas y así no ocupar tanto espacio, pero en lo la version actual, al intentar borrar el archivo de uploads funciona a veces, ya que se encuentra en el buffer, y por esto, el error de que se encuentra ocupada la ruta, pero al acabar de usar el programa, una vez se apague el server, se puede borrar directamente la carpeta imagenes, ya que siempre se comprueba que existan, y si no las crea, además que las imagenes se guardan en la base de datos.

En el lado del usuario, se le tiene que dar a seleccionar Imagen, y se muestra un preview de la imagen, y no se puede seleccionar su mismo mimetype, luego le tiene que dar al botón subir imagen, para subirlo a la base de datos y convertirlo, y por ultimo al darle descargar se descargará la imagen que se subio y se limpia la imagen guardada localmente en la carpeta imagenes (aqui se presenta un error, en la sub-carpeta uploads), si no se le da a descargar imagenes, no se limpia las carpetas locales.

De igual forma, en la base de datos no existe un usuario creado, así que para poder usar la web indefinidamente, se tiene que registrar y logearse, de igual forma al logearse se aparecera un botón llamado Galeria, este muestra las imagenes subidas a la base de datos y la convertida de igual forma a la base de datos, y las muestra lado a lado, diciendo el nombre original, y el nombre con el que se convirtio, así como su mimetype.