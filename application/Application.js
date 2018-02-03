var AssetsDAO = require('../assets').AssetsDAO;
// https://stackoverflow.com/questions/37559610
var consumersideconfig = require('./consumersideconfig.json');

var todosDBB = require('../blockstore').blockstore;


function Application(io, db, multichain) {
    
    
    var assets = new AssetsDAO(db, multichain);

    
    var consumerside = io.of('/consumerside');
	var todosDB = new todosDBB(db);
 
    consumerside.on('connection', function(socket) {
/*
        socket.on('message1', function(msg){
    io.of('/consumerside').emit('message1', msg);
       });
   */
 
        socket.on('getconsumerAuctions', function(indata) {
	    var itemtosearch = '';
            var query ={};
            if(indata.query.type == 'producerlistall')
	    {
		query = {
			'producer': indata.useraddress
		};
            }else if (indata.query.type == 'aggregatorlistall' )
	    {
		query = {
			'aggregator': indata.useraddress
		};
	
	    }
			
            todosDB.getAllAssetsDB(query, function(err, data) {
            if (err) {
				var error ={
					function:'getAllAssetsDB',
					file:'BlockChain.js',
					err: err
				};
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('consumerAuctions', data);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
		    }
			io.of('/consumerside').emit('allAssetsBC', record);
		
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
			io.of('/consumerside').emit('errorReport', error);
				
			
		    }
			io.of('/consumerside').emit('allAddressesBC', record);
		
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
			io.of('/consumerside').emit('errorReport', error);
				
			
		    }
			io.of('/consumerside').emit('gotAddressBalancesBC', record);
		
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
			io.of('/consumerside').emit('errorReport', error);
				
			
		    }
			io.of('/consumerside').emit('gotNewAddress', record);
		
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('grantedPermission', msg);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('issuedAsset', msg);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('issuedMoreAssets', msg);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('issuedAssetFrom', msg);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('sentAssetFrom', msg);
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
			io.of('/consumerside').emit('errorReport', error);
				
			
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
				io.of('/consumerside').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/consumerside').emit('sentAssetFromWithMetadata', msg);
          });
		  
			
		
		});
	
	
	
		});
		
		
		
 
   
   });
 
 return consumerside;
}


module.exports = BlockChain;

