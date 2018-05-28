var http = require('http');
var app = require('./app.js');

//kreiranje servera i postavljanje handlera dolazeceg requesta
//konfiguracija da slusa na portu 8000
http.createServer(app.handleRequest).listen(8000);
