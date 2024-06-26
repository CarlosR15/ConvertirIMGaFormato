-- codigo SQL para crear la base de datos con sus tablas necesarias para el funcionamiento de la  web
CREATE DATABASE IF NOT EXISTS convertIMGaForm_db;

USE convertIMGaForm_db;

CREATE TABLE IF NOT EXISTS usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS registroImgUsuariosRegistrados (
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    tipoImgSinConv VARCHAR(25),
    b64ImgSinConv LONGTEXT NOT NULL,
    nomImgSinConv VARCHAR(255) NOT NULL,
    tipoImgConv VARCHAR(25),
    b64ImgConv LONGTEXT NOT NULL,
    nomImgConv VARCHAR(255) NOT NULL,
    fechaYHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS registroImgInvitados (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cookie MEDIUMTEXT,
    tipoImgSinConv VARCHAR(25),
    b64ImgSinConv LONGTEXT NOT NULL,
    nomImgSinConv VARCHAR(255) NOT NULL,
    tipoImgConv VARCHAR(25),
    b64ImgConv LONGTEXT NOT NULL,
    nomImgConv VARCHAR(255) NOT NULL,
	fechaYHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);