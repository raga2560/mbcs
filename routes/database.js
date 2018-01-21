	


var databaseDBB = require('../databasestore').DatabaseStore;
module.exports = function(io, db) {
 
    var database = io.of('/database');
	var databaseDB = new databaseDBB(db);
 
    database.on('connection', function(socket) {
 
        socket.on('getAllTodos', function() {
			console.log('getalltodo');
            dispatchAll(socket);
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