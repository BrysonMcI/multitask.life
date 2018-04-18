//server.js
var express = require('./config/express'),
    mongoose = require('./config/mongoose');

var db = mongoose();
var app = express(db);

app.listen(8080);

module.exports = app;
console.log('Server running on 8080');
