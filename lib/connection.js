var io = require('socket.io-client');
var parseUri = require('./parse-uri');

var authToken;
module.exports = WSConnection;

var sockets = {};

var urlRegExp = /^ws(s?):\/\//;

function WSConnection(url) {
  var socketURL = SocketURL(url);
  var socket = sockets[socketURL];
  if (! socket) {
    socket = sockets[socketURL] = io.connect(socketURL);
    if (authToken) {
      socket.emit('authenticate', authToken);
    }
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

WSConnection.authenticate = function(token) {
  authToken = token;
  Object.keys(sockets).forEach(function(domain) {
    var socket = sockets[domain];
    try {
      socket.emit('authenticate', token);
    } catch(err) {
      // do nothing
    }
  });
};