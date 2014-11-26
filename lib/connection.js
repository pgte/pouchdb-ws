var io = require('socket.io-client');
var parseUri = require('./parse-uri');

module.exports = WSConnection;

var sockets = {};

function WSConnection(url) {
  var socketURL = SocketURL(url);
  var socket = sockets[socketURL];
  if (! socket) {
    socket = sockets[socketURL] = io.connect(socketURL);
  }
  return socket;
}

function SocketURL(url) {
  var retURL = '';
  retURL += url.protocol + '://' + url.host;
  if (url.port) {
    retURL += ':' + url.port;
  }
  return retURL;
}