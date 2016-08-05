'use strict';

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var https = require('https');
var serveIndex = require('serve-index');

var server = exports;

server.start = function start(port, sPort, credentials, path){

  var app = express()

  app.use(express.static(path));
  app.use(serveIndex(path));

  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(credentials, app);

  httpServer.listen(port);
  httpsServer.listen(sPort);

}
