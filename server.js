const express = require('express');
var path = require('path');
var app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost:3333');

//affiche les dossiers client/static pour servir le css etc ...
app.use('/assets', express.static('client/static'));
app.use('/app', express.static('client/app'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/Client/index.html'));
});

app.listen(3000);