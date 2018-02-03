var express = require('express')
  , app = express() // Web framework to handle routing requests
  , bodyParser = require('body-parser')
  , server = require('http').createServer(app)
  , io = require('socket.io')(server)
  
/*  , iotest = require('socket.io')(server, {
	  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
  
  })  */
  , session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
  , sharedsession = require("express-socket.io-session")

  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application

  
 let multichain = require("multichain-node")({
    port: 7754,
    host: '139.59.33.44',
    user: "multichainrpc",
    pass: "EpQ8bXuEqtEQYXwvaC9wvLVC5KMTsKtmvipw9wn9Q9PL"
});

// Attach session
app.use(session);

// Share session with io sockets

io.use(sharedsession(session));

io.on("connection", function(socket) {
    // Accept a login event with user's data
    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
    });
    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
    });       
 /*socket.on('message', function(msg){
    io.emit('message', msg+1);
  }); */

/*
   socket.on('message1', function(msg){
    io.sockets.emit('message1', msg);
       });
*/
  
});

 
 app.use(bodyParser());
 app.use('/images',express.static(__dirname + '/images'));
 app.use('/public',express.static(__dirname + '/public'));
 app.use('/angularjsapp',express.static(__dirname + '/angularjsapp'));
 
 
 
 app.use(function(req, res, next) {
	 var allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:8100', 'http://localhost:8100'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
  
	 
    
});
// https://stackoverflow.com/questions/35014487/how-do-you-pass-a-socket-object-to-a-route

var BlockChain = require('./routes/BlockChain');
var Application = require('./application/Application');

/*

MongoClient.connect('mongodb://localhost:27017/demoapp', function(err, db) {
    "use strict";
    if(err) throw err;

*/

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err;

  var db = client.db('demoapp');
	
var todos = require('./routes/BlockChain.js')(io, db, multichain);
var application = require('./application/Application.js')(io, db, multichain);
var mydbs = require('./routes/database.js')(io, db);

	routes(app, db, multichain, io);
    // Application routes
	
    server.listen(8080, function (){
	

	
  
    console.log('Express server listening on port 8080');
});

});



