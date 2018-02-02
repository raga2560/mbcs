//var Blockchain = require('./Blockchain');
// https://stackoverflow.com/questions/37559610
var io = require('socket.io-client');

var expect = require('chai').expect;

 var socket = io('http://localhost:8080/blockchain');
   //       this.recordname = "mandicollection";
/*
 Add `socket.io-client` to your `package.json` and then:

  ```js
  var socket = require('socket.io-client')('http://localhost');
  socket.on('connect', function(){});
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
  ```


*/
  var producer ={
            "name": "Paras",
                        "role": "producer",
                        "blockaddress": "1YuMTUESchZYPkba44nEknCjeATRFir58qGTmi",
                        "preference": ["organic", "native", "raw"],
                        "itemtypes": ["rice", "dhal", "fruits"],
                        "place": "Bangalore"
        };

        var query = {
                type: 'producerlistall'
        };
        var listalldata = {
                query: query,
                recordname: 'test',
                useraddress: producer.blockaddress
        };

    describe('addTwoNumbers()', function () {
  it('should add two numbers', function () {
    
    // 1. ARRANGE
    var x = 6;
    var y = 1;
    var sum1 = x + y;

   socket.on('allAssetsDB', (res) => {
    expect(res.length).to.be.equal(sum1);
	// console.log(res);
      // this.selleritems.next(res);
      // this.observer.complete();
    });


    // 2. ACT
    var sum2 =2 ; // addTwoNumbers(x, y);
    socket.emit('getAllAssetsDB', listalldata);

    // 3. ASSERT
//    expect(sum2).to.be.equal(sum1);

  });
});

/*
  this.socket.on('issuedAsset', (res) => {
      this.selleritem.next(res);
      // this.observer.complete();
    });
    this.socket.emit('issueAsset', pushdata);
    return this.getObservable();
  }

*/
