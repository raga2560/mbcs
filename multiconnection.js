 
let multichain = require("multichain-node")({
    port: 7754,
    host: '139.59.33.44',
    user: "multichainrpc",
    pass: "EpQ8bXuEqtEQYXwvaC9wvLVC5KMTsKtmvipw9wn9Q9PL"
});
const assert = require('assert');

const bluebird = require("bluebird");
var multichainp = bluebird.promisifyAll((multichain), {suffix: "Promise"});

/*
multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
}) */
console.log("TEST: GET NEW ADDRESS")
    multichainp.getNewAddressPromise()
    .then(address => {
		
		console.log(address);
        
        var address1 = address;

        console.log("TEST: VALIDATE ADDRESS")
        return multichainp.validateAddressPromise({address: address1})
    });
	/*
	
var someAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someOtherAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someTxId = '231a4f30e2eeba817e4277e39ca65880ff848c52694bf789c5dc0af0ac8bbc31';

multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
    console.log(res)
})

multichain.sendAssetFrom({from: someAddress, to: someOtherAddress, asset: "zcoin", qty: 5}, (err, tx) => {
    console.log(tx);
})

multichain.getAddresses((err, addresses) => {

    multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
        console.log(wallet)
    })
    
})

multichain.getRawTransaction({txid: someTxId}, (err, tx) => {

    multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(dTx)
    })
})

*/