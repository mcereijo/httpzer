'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var serveIndex = require('serve-index');
var pathLib = require('path');

var server = exports;

server.start = function start(port, sPort, host, credentials, path, spa){

  var app = express()

  app.use(express.static(path));
  app.use(serveIndex(path));

  // Enable single page applications
  if (spa) {
    app.use(function (req, res, next) {
      res.status(404);
      var absPath = path;
      if (!pathLib.isAbsolute(path)) {
        absPath = pathLib.join(process.cwd(), path);
      }
      res.sendFile(absPath);
    });
  }

  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(credentials, app);

  httpServer.listen(port, host);
  httpsServer.listen(sPort, host);

}
