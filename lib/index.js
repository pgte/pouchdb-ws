
var adapter = require('./adapter');
module.exports = adapter;

adapter.init = init;

function init(PouchDB) {
  PouchDB.adapter('ws', adapter);
  PouchDB.adapter('wss', adapter);
}