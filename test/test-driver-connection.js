process.mixin(require("./common"));

var good_connected = false,
    bad_failed = false,
    db;

// Connect to a valid database
db = persistence.connect('sqlite', testdb);
db.addListener('connection', function () {
  good_connected = true;
});
db.close();

// Connect to an invalid database
db = persistence.connect('sqlite', '////');
db.addListener('error', function (reason) {
  bad_failed = true;
});
db.close();

process.addListener('exit', function () {
  assert.ok(good_connected, "good server failed to connect");
  assert.ok(bad_failed, "bad server failed to fail");
});
