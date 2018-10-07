var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var app = express();
var URL = require('url');
var http = require('http');

// var port = normalizePort(process.env.PORT || '3001');
// app.set('port', port);
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// console.log(bodyParser)

server.listen(3002);

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// 5555554
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// router.post('/login', multipartMiddleware, function(req, res) {
//     // console.log('get FormData Params: ', req.body);
//     var params = req.body;
//     console.log(req.body)
//     console.log(params.username)
//     var user = {}
//     user.u = params.username
//     var response = { status: 1, data: req.body };
//     res.send(JSON.stringify(response));
// });
router.post('/login', function(req, res, next) {

    var params = req.body;
    // console.log(req.body)
    console.log(params.username)
    var user = {}
    user.u = params.username
    var response = { status: 1, data: user };
    res.send(JSON.stringify(response));

});

router.get('/login', function(req, res, next) {

    var params = URL.parse(req.url, true).query;

    console.log(params.username)

    var user = {
        name: '黄秀秀',
        age: 18
    }
    user.u = params.username

    var response = { status: 4, data: user };
    // setTimeout(() => {
    res.send(JSON.stringify(response));
    // }, 4000);

});

router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

app.use('/', router)