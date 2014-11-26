exports.init = init;

var adapter = require('./adapter');

function init(PouchDB) {
  PouchDB.adapter('ws', adapter);
  PouchDB.adapter('wss', adapter);
}