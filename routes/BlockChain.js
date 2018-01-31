var AssetsDAO = require('../assets').AssetsDAO;
// https://stackoverflow.com/questions/37559610
var blockchainconfig = require('./blockchainconfig.json');

var todosDBB = require('../blockstore').blockstore;


function BlockChain(io, db, multichain) {
    
    
    var assets = new AssetsDAO(db, multichain);

    
    var blockchain = io.of('/blockchain');
	var todosDB = new todosDBB(db);
 
    blockchain.on('connection', function(socket) {
 
        socket.on('getAllAssetsDB', function() {
			
            todosDB.getAllAssetsDB(function(err, data) {
            if (err) {
				var error ={
					function:'getAllAssetsDB',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('allAssetsDB', data);
          });
		
        });
 
        socket.on('getAllAssetsBC', function() {
	
		    assets.listAssets( function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getAllAssetsBC',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('allAssetsBC', record);
		
		});
		});
		
		socket.on('getAllAddressesBC', function() {
	
		    assets.listAddresses( function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getAllAddressesBC',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('allAddressesBC', record);
		
		});
		});
		
		socket.on('getAddressBalancesBC', function(data) {
			var minconf=1;
	
		    assets.getAddressBalances(data.address,minconf, function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getAddressBalancesBC',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('gotAddressBalancesBC', record);
		
		});
		});
		
		socket.on('getNewAddress', function(data) {
			
	
		    assets.getNewAddress( function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getNewAddress',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('gotNewAddress', record);
		
		});
		});
		
		
		
		socket.on('grantPermission', function(data) {
			/*
			{
            address: address1, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		
		 assets.grantPermission(data.address, data.permissions, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'grantPermission',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			var msg = {
				tx: tx,
				addresses: data.address,
				permissions: data.permissions
			};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error ={
					function:'grantPermission',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('grantedPermission', msg);
          });
		  
			
		
		});
		});
		

		socket.on('issueAsset', function(data1) {
			/*
			{
            address: address1, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
			var data = data1.data;
	        console.log(data);
		    assets.issue(data.address, data.asset, data.qty, data.units, data.details, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
			console.log(err);
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			var msg = {
				tx: tx,
				producer: data.address,
				consumer: '',
				aggregator: '',
				auctioner: '',
				addresses: [data.address],
				details: data.details,
				asset: data.asset
			};
			
			console.log(msg);
			console.log(data.address);
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('issuedAsset', msg);
          });
		  
			
		
		});
		});
		
		socket.on('issueMoreAssets', function(data) {
			/*
			{
            address: address1, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		    assets.issueMore(data.address, data.asset, data.qty, data.details, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'issueMoreAssets',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			var msg = {
				tx: tx,
				addresses: data.address
			};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error ={
					function:'issueMoreAssets',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('issuedMoreAssets', msg);
          });
		  
			
		
		});
		});
		
		
		socket.on('issueAssetFrom', function(data) {
			/*
			{
			from: fromaddress
            to: toaddress, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		    assets.issueFrom(data.fromaddress, data.toaddress, data.asset, data.qty, data.details, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			
			var msg = {
				tx: tx,
				addresses: [data.fromaddress, data.toaddress],
				fromaddress:data.fromaddress
				};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error = {
					function:'issueAssetFrom',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('issuedAssetFrom', msg);
          });
		  
			
		
		});
	
	
	
		});
		
		socket.on('sendAssetFrom', function(data1) {
			/*
			{
			from: fromaddress
            to: toaddress, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
			
			var data = data1.data;
			var actiontype = data1.actiontype;
	
		    assets.sendAssetFrom(data.fromaddress, data.toaddress, data.asset, data.qty, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'sendAssetFrom',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
		
			var producer = '';
			var aggregator = '';
			var consumer = '';
			var auctioner = '';
			var returnaddress = '';
			if(actiontype == 'producertoaggregator'){
			producer = data.fromaddress;
			aggregator = data.toaddress;
			}else	
			if(actiontype == 'aggregatortoauctioner'){
			aggregator = data.fromaddress;
			auctioner = data.toaddress;
			}else	
			if(actiontype == 'auctionertoconsumer'){
			auctioner = data.fromaddress;
			consumer = data.toaddress;
			}else	
			if(actiontype == 'returnfromauctioner'){
			auctioner = data.fromaddress;
			returnaddress = data.toaddress;
			}	
			var msg = {
				tx: tx,
				producer: producer,
				consumer: consumer,
				aggregator: aggregator,
				returnaddress: returnaddress,
				auctioner: auctioner,
				details: data.details,
				asset: data.asset,
	
				addresses: [data.fromaddress, data.toaddress],
				fromaddress:data.fromaddress,
				toaddress: data.toaddress
				};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error = {
					function:'sendAssetFrom',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('sentAssetFrom', msg);
          });
		  
			
		
		});
	
	
	
		});
		
		socket.on('sendAssetFromWithMetadata', function(data) {
			/*
			{
			from: fromaddress
            to: toaddress, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		    assets.sendAssetFromWithMetadata(data.fromaddress, data.toaddress, data.asset, data.qty, data.details,data.metadata, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'sendAssetFromWithMetadata',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			
			var msg = {
				tx: tx,
				addresses: [data.fromaddress, data.toaddress],
				fromaddress:data.fromaddress,
				toaddress: data.toaddress,
				metadata: data.metadata
				};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error = {
					function:'sendAssetFromWithMetadata',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('sentAssetFromWithMetadata', msg);
          });
		  
			
		
		});
	
	
	
		});
		
		
		
 
   
   });
 
 return blockchain;
}


module.exports = BlockChain;

