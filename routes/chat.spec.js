'use strict'

var expect = require('chai').expect
  , io = require('socket.io-client')
  , server = require('../server')

  , ioOptions = { 
      transports: ['websocket']
    , forceNew: true
    , reconnection: false
  }
  , testMsg = 'HelloWorld'
  , sender
  , receiver



describe('Chat Events', function(){
  beforeEach(function(done){
    
    // start the io server
//    server.start()
    // connect two io clients
    sender = io('http://localhost:8080/', ioOptions)
    receiver = io('http://localhost:8080/', ioOptions)
    
    // finish beforeEach setup
    done()
  })
  afterEach(function(done){
    
    // disconnect io clients after each test
    sender.disconnect()
    receiver.disconnect()
    done()
  })

  describe('Message Events', function(){
  it('Clients should receive a message when the `message` event is emited.', function(done){
  var p1 = 'abcd';
  var p2 = 'hhabcd';
      sender.emit('message1', testMsg)
      receiver.on('message1', function(msg){
        expect(msg).to.equal(testMsg)
        expect(p1).to.equal(p2)
        done()
      })
    })
  })
})
