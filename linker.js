 
sinkaddr = require("sinkaddress");
const assert = require('assert');

const bluebird = require("bluebird");

//var sinkaddrp = bluebird.promisifyAll((sinkaddr), {suffix: "Promise"});



function linker () {


 this.getSAfromPKandRedeem = function(Pk1, Pk2, Pk3, network, callback) {
    var sa1=sinkaddr.sinkaddresslib.getSAfromPK(Pk1,Pk2, Pk3, network);
    var sa = sinkaddr.sinkaddresslib.getSAfromPK(Pk1, Pk2, Pk3, network);
    var rd = sinkaddr.sinkaddresslib.getRDScriptfromPK(Pk1, Pk2, Pk3, network);

    console.log("linker:sinkaddress="+sa);

     var data =
	{
	linkaddress: sa,
	redeemscript : rd
	};
     callback (null, data);
 }



}

module.exports.linker = linker;

