const express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var Particle = require('particle-api-js');
var particle = new Particle();
var token;
const mongoose = require("mongoose");
const Photon = require('./models/photon.model');
const Event = require('./models/event.model');
mongoose.connect('mongodb://localhost:27017/photons');

//Pour servir le css etc ...
app.use('/assets', express.static('client/static'));
app.use('/app', express.static('client/app'));

app.use(bodyParser.urlencoded({ extended: true }));
// Parse le JSON. Ajout pas possible sans cette ligne
app.use(bodyParser.json({ type: 'application/json' }));

/////////////////////
particle.login({username: 'empty0@live.fr', password: '58m77mParticle'}).then(
    function(data) {
        token = data.body.access_token;
        var devicesPr = particle.listDevices({ auth: token });
        devicesPr.then(
            function(devices){
            	app.get('/api', function(req,res) {
                    var liste_photons = devices.body;
                    liste_photons.forEach(function(item) {
                        Photon.findOne({'id' : item.id}, function(err, docs) {
                            if (err) {
                                console.log(err);
                            } else if (docs == null) {
                                var photon = new Photon(item);
                                photon.save().then(function(req, res) {
                                    console.log('ajout ok');
                                });
                            } else {
                                console.log("déjà présent");
                                docs.update(item).then(function(res, err) {
                                    if (res) {
                                        console.log(res);
                                    } else {
                                        console.log(err);
                                    }
                                });
                            }
                        })
                    });
            		return res.json(devices.body);
            	});
                app.get('/api/:id', function(req,res) {
                    console.log(req.params.id);
                    Photon.findOne({'id' : req.params.id}, function(err, docs) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json(docs);
                        }
                    });
                });
            	console.log('Devices: ', devices.body);
            },
            function(err) {
                console.log('List devices call failed: ', err);
            }
        );
    particle.getEventStream({ deviceId: '2c002d000447363333343435', auth: token }).then(function(stream) {
        stream.on('event', function(data) {
                console.log("Event: ", data);
                var evenement = new Event(data);
                evenement.save().then(function(err, res) {
                    console.log(err);
                });
            });
        });
    },
    function (err) {
        console.log('Could not log in.', err);
    }
);

////////////////////

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/api/:id/events', function(req, res) {
    Event.find({'coreid': req.params.id}, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.json(docs);
        }
    });
});

app.get('/photon/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});