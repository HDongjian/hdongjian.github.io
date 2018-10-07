var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
var URL = require('url');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {

    var params = req.body;

    var user = {}
    user.u = params.username
    var response = {status:1,data:user};
    res.send(JSON.stringify(response));

});

router.get('/login', function(req, res, next) {

    var params = URL.parse(req.url, true).query;

    console.log(params)

    var user = {}
    user.u = params.username

    var response = {status:2,data:user};
    res.send(JSON.stringify(response));

});

router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

app.use('/', router)

module.exports = app;