var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const pingService = require('./ping');
app.listen(3001);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/ping', function(req, res) {
    res.json({
        result : 1,
        message : 'OKey',
    })
});

pingService.ping(1);