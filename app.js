var express = require('express');
var app = express();
var expressHbs = require('express3-handlebars');
var mongoose = require('mongoose');
var cors = require('cors')

// var searchBox=require('./search-bar.js');
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('bower_components'));
app.use(cors());

app.engine('hbs', expressHbs({
    extname: 'hbs',
    defaultLayout:'main.hbs'
}));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/uiLib');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log(db.name);
});

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/getData', function(req, res) {
    //console.log('hi');
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "dbName": db.name
    });
    //res.render('index');
});
app.get('/caraousel', function(req, res) {

    res.render('caraousel', {
        products: [{
            name: "xyzz1",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz2",
            src: "http://n2.sdlcdn.com/imgs/a/h/2/113x132/Gauba-Traders-Jackly-31-In-SDL797046782-1-b9308.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz3",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg"
        }, {
            name: "xyzz4",
            src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz5",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
            price: "Rs 1000"
        }, {
            name: "xyzz6",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg"
        }, {
            name: "xyzz7",
            src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz8",
            src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz9        ",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
        }, {
            name: "xyzz10",
            src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz11",
            src: "http://n4.sdlcdn.com/imgs/a/j/m/113x132/PIGEON-IGT-GAS-CYLINDER-TROLLY-SDL887382732-1-85942.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz12",
            src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg"
        }, {
            name: "xyzz13",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
            price: "Rs 1000"
        }, {
            name: "xyzz14",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz15",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg"
        }, {
            name: "xyzz16",
            src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz17",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
            price: "Rs 1000"
        }, {
            name: "xyzz18",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg"
        }, {
            name: "xyzz19",
            src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz20",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz21",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",

            name: "xyzz22",
            src: "http://n2.sdlcdn.com/imgs/a/i/g/113x132/KAFF-60cm-Base-Chimney-SDL004185488-1-761b3.jpg",
            price: "Rs 1000"
        }, {
            name: "xyzz23",
            src: "http://n4.sdlcdn.com/imgs/a/n/3/113x132/Apple-iPhone-6-16-GB-SDL692531484-1-6ec21.jpeg",
            price: "Rs 1000"
        }, {
            name: "xyzz24",
            src: "http://n3.sdlcdn.com/imgs/a/y/q/113x132/jumbo_1-5c367.jpg"
        }]
    });

});
app.get('/searchbox', function(req, res) {
    res.render('searchbox');
});
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});