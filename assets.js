const bluebird = require("bluebird");
const assert = require('assert');

let listenForConfirmations = (txid, cb) => {
    console.log("WAITING FOR CONFIRMATIONS")
    var interval = setInterval(() => {
        getConfirmations(txid, (err, confirmations) => {
            if(confirmations > 0){
                clearInterval(interval);
                return cb(null, true);
            }
            return cb(null, false);
        }) 
    }, 5000)
}

let getConfirmations = (txid, cb) => {
    multichain.getWalletTransaction({
        txid: txid
    }, (err, tx) => {
        if(err){
            console.log("look for confirmed state", err)
            return cb(err)
        }
        return cb(null, tx.confirmations);
    })
}

function AssetsDAO(db, multichain) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof AssetsDAO)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new AssetsDAO(db);
    }

    var sportsdata = db.collection("assets");
	
	var multichainp = bluebird.promisifyAll((multichain), {suffix: "Promise"});	
	
	
	
//---------------------------------1.1-------------------------------------------//
	
	

var someAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someOtherAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someTxId = '231a4f30e2eeba817e4277e39ca65880ff848c52694bf789c5dc0af0ac8bbc31';



	this.getInfo = function (  callback) {
        "use strict";

		multichain.getInfo((err, info) => {
		if(err){
        throw err;
		}
		console.log(info);
		callback(null, info);
		})



	}


	this.sendAssetFrom = function (fromAddress, toAddress, asset, qty,  callback) {
        "use strict";

		var msg = {
            from: fromAddress,
            to: toAddress,
            asset: "Tomoto",
            qty: 1
        };
		
		
		multichain.sendAssetFromPromise(msg, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(Txid => {
        assert(Txid);
        listenForConfirmations(Txid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })
	
	
		




	}

	

	this.listAssets = function ( callback) {
        "use strict";

		console.log('listAssets');
		multichain.listAssetsPromise().then(assets => {
        assert(assets);
        callback(null, assets);
		})
		.catch(err => {
        console.log(err)
		callback(err, null);
        
		})



	}
	
	
	this.getNewAddress = function ( callback) {
        "use strict";

		// console.log(someAddress);
		multichain.getNewAddressPromise().then(address => {
        assert(address);
        callback(null, address);
		})
		.catch(err => {
        console.log(err)
		callback(err, null);
        
		})



	}
	
	this.grantPermission = function (address, callback) {
        "use strict";

		// console.log(someAddress);
		var grant = {
		 addresses: address,
            permissions: "send,receive,issue,admin"
		};
		
		multichain.grantPromise(grant).then(permissionTxid => {
        assert(permissionTxid);
        listenForConfirmations(permissionTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })





	}
	
	
	this.getAddressBalances = function (address,minconf, callback) {
        "use strict";

		// console.log(someAddress);
		var query = {
		 address: address,
            minconf: minconf
		};
		
		
		multichain.getAddressBalancesPromise(query).then(balances => {
        assert(balances);
        	callback(null, balances);
        
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })





	}
	
	
	
	this.listAddresses = function ( callback) {
        "use strict";

		console.log(someAddress);
		multichain.listAddressesPromise().then(addresses => {
        assert(addresses);
        callback(null, addresses);
		})
		.catch(err => {
        console.log(err)
		callback(err, null);
        
		})



	}
	
	
	this.issue = function ( toaddr,assetname, qty, units, details,  callback) {
        "use strict";

		var msg = {
			
            address: toaddr,
            asset: assetname,
            qty: eval(qty),
            // details: details,
			units: units
			
		};
		
		console.log(msg);
		
		console.log(someAddress);
		multichain.issuePromise(msg, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(issueTxid => {
        assert(issueTxid);
        listenForConfirmations(issueTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })



	}
	
		this.issueMore = function ( toaddr,assetname, qty, details,  callback) {
        "use strict";

		var msg = {
			
            address: toaddr,
            asset: assetname,
            qty: qty,
            details: details
		};
		console.log(someAddress);
		multichain.issueMorePromise(msg, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(issueTxid => {
        assert(issueTxid);
        listenForConfirmations(issueTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })



	}

	
			
	this.issueFrom = function (fromaddr, toaddr,assetname, qty, details,  callback) {
        "use strict";

		var msg = {
			from: fromaddr,
            to: toaddr,
            asset: assetname,
            qty: qty,
            details: details
		};
	
	
		console.log(someAddress);
		multichain.issueFromPromise(msg, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(issueTxid => {
        assert(issueTxid);
        listenForConfirmations(issueTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })



	}


	this.sendAssetFromWithMetadata = function (fromaddr, toaddr,assetname, qty, details, metadata,  callback) {
        "use strict";

		var msg = {
			from: fromaddr,
            to: toaddr,
            asset: assetname,
            qty: qty,
            details: details,
			data: new Buffer(metadata).toString("hex")

		};
	
	
		console.log(someAddress);
		multichain.sendWithMetadataFromPromise(msg, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(issueTxid => {
        assert(issueTxid);
        listenForConfirmations(issueTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })



	}


	

	this.getRawTransaction = function (someTxId,  callback) {
        "use strict";

		multichain.getRawTransaction({txid: someTxId}, (err, tx) => {

		multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(dTx)
		})
		})


	}
	
	this.getAddresses = function (addresses,  callback) {
        "use strict";

		multichain.getAddresses((err, addresses) => {

		multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
			if(err){
			console.log(err);
        throw err;
		}
		console.log(res);
		callback(null, res);
		
		
        console.log(wallet)
		});
    
		})


	}
	// getAllAssets
	
	/*
	
	transactions
	initiator
	confirmations
	assetid
	owner of asset
	
	how many assets does a user have
	
	user-assets, transaction 
	
	transactions, addresses, initiator
	
	
	*/
	
	
}

module.exports.AssetsDAO = AssetsDAO;
