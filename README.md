# Proyecto node js Carlos Rubén Romellón IGTI

## Instrucciones y comentarios

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

Todas estas aparecen en el archivo package.json

### instalación

Con el comando:

`npm i bcrypt cookie-parser dotenv express express-session jsonwebtoken multer mysql2 passport passport-local pug sass sharp`

y las de desarrollador con el comando

`npm i nodemon npm-run-all -D`

De igual manera, se tendra que crear una base de datos en MySQL workbench
con el codigo sql que se encuentra dentro de laa carpeta llamada "bd" 

## Comentarios

En la parte de conversiones, no se incluyo el jpg, ya que al llamar el mimeType de una imagen JPG, se te regresa un image/jpeg, asi que se tomo en cuenta que las imagenes jpg son jpeg.

Y en el tema de la conversion, es necesario las carpetas imagenes/uploads y imagenes/downloads, estas se creen con la libreria "fs", que una que ya tiene el mismo node js de manera predeterminada, en cuanto a subir las imagenes, estas si se suben en base64, y al final se lanza una funcion para eliminar las imagenes de las carpetas y así no ocupar tanto espacio, pero en lo personal, el intentar borrar el archivo de uploads funciona a veces, y esto se debe a que según se sigue usando en algún proceso la ruta que se utiliza para eliminar el archivo.