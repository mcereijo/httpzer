'use strict';

var path = require('path');
var fs   = require('fs');
var program = require('commander')

var pack = require('../package.json');
var server = require('./server.js');

var privateKey  = fs.readFileSync(__dirname+'/ssl-certs/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname+'/ssl-certs/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var path = "./";

program
  .version(pack.version)
  .option('-p, --port <port>', 'Port for running the http protocol (Default: 8080)')
  .option('-s, --secure-port <port>', 'Port for running the https protocol (Default: 8081)')
  .option('-h, --host <host>', 'Host to bind the server (Default: 0.0.0.0)')
  .option('-d, --dir [path]', 'Directory to serve (Default: ./)')
  .parse(process.argv)

var port = 8080;
if (typeof program.port != "undefined") {
  port = parseInt(program.port);
}

var sPort = 8081;
if (typeof program.securePort != "undefined") {
  sPort = parseInt(program.securePort);
}

var host = "0.0.0.0";
if (typeof program.host != "undefined") {
  host = program.host;
}

var dir = "./";
if (typeof program.dir != "undefined") {
  dir = program.dir;
}

server.start(port, sPort, host, credentials, dir);

console.log('HTTP server started on ' + host + ':' + port);
console.log('HTTPS server started on ' + host + ':' + sPort);
