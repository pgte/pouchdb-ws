# pouchcb-ws

PouchDB over websockets provider.

Goes well with pouchdb-ws-proxy.

# Install

```bash
$ npm install pouchdb-ws --save
```

# Initialize

(Assuming server-side or using Browserify):

```javascript
var PouchDB = require('pouchdb')
var PouchWS = require('pouchdb-ws');
PouchWS.init(PouchDB);
```

# Use

```javascript
var remoteDB = new PouchDB('ws://hostname.example.com/mydatabase');

remoteDB.get('key', function(err, value) {
  if (err) {
    console.log('error:', err);
  }
  else {
    console.log('key value is', value);
  }
});
```

# Authentication

You can use a special authenticate command to authenticate a session into the server proxy:

```javascript
PouchWS.authenticate(token);
```

# License

MIT