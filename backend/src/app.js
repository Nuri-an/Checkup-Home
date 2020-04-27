require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express(); //Criação de uma var para a aplicação, e esta está sendo instanciada
app.use(express.json()); // deve ficar antes das rotas
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(require("./routes"));

module.exports = app;