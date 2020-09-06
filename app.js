const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api');

//cargamos el contenido del fichero .env
require('dotenv').config();

const app = express();

//Lanzamos la conexión a la BD
require('./dbConfig').connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 
 * GESTIÓN DE RUTAS
 * 
 */

app.use('/api', apiRouter);

module.exports = app;
