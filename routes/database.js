var linkerDB = require('../linker').linker;
	


var databaseDBB = require('../databasestore').DatabaseStore;
module.exports = function(io, db) {
 
	var linker = new linkerDB();
    var database = io.of('/database');
	var databaseDB = new databaseDBB(db);
 
    database.on('connection', function(socket) {
 
        socket.on('getAllTodos', function() {
			console.log('getalltodo');
            dispatchAll(socket);
        });
        socket.on('getAlllinks', function() {
			console.log('getalltodo');
        databaseDB.getAllTodos(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

	io.of('/database').emit('alllinks', data);
              });
        });
        socket.on('issuelink', function(sentdata) {
			console.log('issuelink:'+ JSON.stringify(sentdata));
	var data1 = {
	publickey: sentdata.data.publickey,
	redeemscript: '',
	linkaddress: ''
	};
        var bankwif = 'cRgnQe1TQngWfX53nSbjuiBzpY1kB5aDVZBFyegf5jAvQGZPojA1';
        var controllerwif = 'cRgnQe1TQngWfX53nSbjTGp3BwvrzawVYLqyR6qAr3zU16T3b2FB';
        var bankkeyPair = bitcoin.ECPair.fromWIF(
     		bankwif,
     		bitcoin.networks.testnet);

        var controllerkeyPair = bitcoin.ECPair.fromWIF(
     		controllerwif,
     		bitcoin.networks.testnet);

	var bankpubkey = bankkeyPair.getPublicKeyBuffer();

	var controllerpubkey = controllerkeyPair.getPublicKeyBuffer();
        var network = sentdata.network;

	//console.log(sentdata.data.publickey);
        var sentpubkeybuffer = Buffer.from(sentdata.data.publickey);
        linker.getSAfromPKandRedeem(bankpubkey, 
			sentpubkeybuffer,
			controllerpubkey,
		        network, function (err, data) { 
	//console.log(data);
           data1.linkaddress = data.linkaddress;
           data1.redeemscript = data.redeemscript.toString();

            databaseDB.saveTodo(data1, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
	io.of('/database').emit('issuedlink', data);
            });
	  });

        });
 
        socket.on('saveTodo', function(todo) {
            databaseDB.saveTodo(todo, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
                dispatchAll(socket);
            });
        });
 
        socket.on('updateTodo', function(data) {
            databaseDB.updateTodo(data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
        
        socket.on('deleteTodo', function(data) {
            databaseDB.deleteTodo(data.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
 
        // On connection send all the database, to save one round trip
        dispatchAll(socket);
    });
 
 
    function dispatchAll(socket) {
        databaseDB.getAllTodos(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
			data = "hello";
            io.of('/database').emit('allTodos', data);
        });
    }
 
    return database;
}
