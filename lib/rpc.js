'use strict';

var parseUri = require('./parse-uri');
var connection = require('./connection');
var extend = require('util')._extend;

module.exports = WsRpc;

function WsRpc(options, cb) {
  var parsedURL = parseUri(options.url);
  var socket = connection(parsedURL);
  var args = extend({}, options);
  delete args.url;
  args.path = parsedURL.path;
  args.query = parsedURL.query;

  socket.on('disconnect', onDisconnect);
  socket.emit('rpc', args, callback);

  var calledback = false;

  function callback(err, ret) {
    if (! calledback) {
      calledback = true;
      socket.removeListener('disconnect', onDisconnect);
      cb(err, ret);
    }
  }

  function onDisconnect() {
    callback(new Error('disconnected'));
  }
}

WsRpc.authenticate = function(token) {
  connection.authenticate(token);
};
