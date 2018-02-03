'use strict'
var expect = require('chai').expect;


var ioOptions = { 
      transports: ['websocket']
    , forceNew: true
    , reconnection: false
  };

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
    var p1 = 'abcd';
    var p2 = 'def';
var io = require('socket.io-client');
var ssocket = io('http://localhost:8080/blockchain', ioOptions);
var rsocket = io('http://localhost:8080/blockchain', ioOptions);
       ssocket.emit('getAllAssetsDB', listalldata);
     rsocket.on('allAssetsDB', (res) => {


/*
//     			expect(p1).to.be.equal(p2);
     			expect(x).to.be.equal(sum1);
		    expect({a: 1}).to.have.property('ab');
		    expect( res[i]).to.have.property('_ttt');
 */
      });



//     			expect(p1).to.be.equal(p2);

    });

});

