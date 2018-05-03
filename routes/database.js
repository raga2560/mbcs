var linkerDB = require('../linker').linker;
bitcoin = require('bitcoinjs-lib');

	
 var bankwifs = [
'cRgHDYqrtkroagSUnjwmXUXSno9LSiQtw1HrMossTYpdMEBfSzmK',
'cRgnQe1TQmgmz1fzyffsuUEuzDYiuMuUdTvXKAwYVRM8qt441vY9'
 ];

var controllerwif = 'cRgnQe1TQngWfnsLm7poFfow18d58j3bAm57dzwWAUFvmX5KJ76M';

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
	console.log('getAlllinks:');

        databaseDB.getAllTodos(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

        console.log("alllinks, returning:" + JSON.stringify(data));
	io.of('/database').emit('alllinks', data);
              });
        });

        socket.on('clearrecords', function(sentdata) {

	console.log('clearrecords:'+ JSON.stringify(sentdata));

         if(sentdata.data.chosenbank == 'ICICI')
         {
	bankwif = bankwifs[1];
	 }
         else {
	bankwif = bankwifs[0];
	 }
        var bankkeyPair = bitcoin.ECPair.fromWIF(
     		bankwif,
     		bitcoin.networks.testnet);

	var bankpubkey = bankkeyPair.getPublicKeyBuffer();

        var bankpubkeystr = bankpubkey.toString('hex');

        databaseDB.clearRecords(bankpubkeystr, function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

        console.log("banklinks, returning:" + JSON.stringify(data));
	io.of('/database').emit('banklinks', data);
              });
        });

        socket.on('deletelink', function(sentdata) {
	console.log('deletelink:'+ JSON.stringify(sentdata));

        databaseDB.deletelink(sentdata.data.linktoremove, function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

        console.log("banklinks, returning:" + JSON.stringify(data));
	io.of('/database').emit('banklinks', data);
              });
        });

        socket.on('getBanklinks', function(sentdata) {

	console.log('getBanklinks:'+ JSON.stringify(sentdata));

        var bankwif;

         if(sentdata.data.chosenbank == 'ICICI')
         {
	bankwif = bankwifs[1];
	 }
         else {
	bankwif = bankwifs[0];
	 }

        var bankkeyPair = bitcoin.ECPair.fromWIF(
     		bankwif,
     		bitcoin.networks.testnet);

	var bankpubkey = bankkeyPair.getPublicKeyBuffer();

        var bankpubkeystr = bankpubkey.toString('hex');

        databaseDB.getBanklinks(bankpubkeystr, function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

        console.log("banklinks, returning:" + JSON.stringify(data));
	io.of('/database').emit('banklinks', data);
              });
        });


        socket.on('getUserlinks', function(sentdata) {

	console.log('getUserlinks:'+ JSON.stringify(sentdata));


        var userpubkeystr = sentdata.data.publickey;

        databaseDB.getUserlinks(userpubkeystr, function(err, data) {
            if (err) throw err; // You can emit the error to a socket 

        console.log("userlinks, returning:" + JSON.stringify(data));
	io.of('/database').emit('userlinks', data);
              });
        });

        socket.on('issuelink', function(sentdata) {

	console.log('issuelink:'+ JSON.stringify(sentdata));

	var data1 = {
	publickey: sentdata.data.publickey,
	redeemscript: '',
	bank: sentdata.data.chosenbank,
	linkaddress: ''
	};
        var bankwif;
         if(sentdata.data.chosenbank == 'ICICI')
         {
	bankwif = bankwifs[1];
	 }
         else {
	bankwif = bankwifs[0];
        }

        var bankkeyPair = bitcoin.ECPair.fromWIF(
     		bankwif,
     		bitcoin.networks.testnet);

        var controllerkeyPair = bitcoin.ECPair.fromWIF(
     		controllerwif,
     		bitcoin.networks.testnet);

	var bankpubkey = bankkeyPair.getPublicKeyBuffer();

	var controllerpubkey = controllerkeyPair.getPublicKeyBuffer();
        var network = bitcoin.networks.testnet;

	//console.log(sentdata.data.publickey);
        var sentpubkeybuffer = new Buffer(sentdata.data.publickey, 'hex');
        //var sentpubkeybuffer = Buffer.from(sentdata.data.publickey);
        linker.getSAfromPKandRedeem(bankpubkey, 
			sentpubkeybuffer,
			controllerpubkey,
		        network, function (err, data) { 
	//console.log(data);
           data1.linkaddress = data.linkaddress;
           data1.redeemscript = data.redeemscript.toString('hex');
           data1.bankpubkey = bankpubkey.toString('hex');

            databaseDB.findredeemscript(data1, function(err, reddata) {
		console.log("findredeemdata:" + JSON.stringify(reddata));
		console.log("datatoinsert:" + data1);
            if(reddata == null || reddata.length == 0) {
            databaseDB.saveTodo(data1, function(err, savdata) {
		console.log("savdata:" + savdata);
                if (err) throw err; // You can emit the error to a socket	
	    console.log("issuedlink, returning:" + JSON.stringify(savdata));
	      io.of('/database').emit('issuedlink', savdata);
            });
            } else {
	      var businesserror = {
		reason: 'link already exists'
		};
	    console.log("issuedlink, returning:" + JSON.stringify(reddata));
	      io.of('/database').emit('issuedlink', reddata);
            }
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
