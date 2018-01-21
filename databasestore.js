
function Database(dbsent) {
 
 var db = dbsent.collection("dbdata");
var database = {
 
    getAllTodos: function(callback) {
        db.find().toArray(callback);
    },
    saveTodo: function(todo, callback) {
        db.insert(todo, callback);
    },
    updateTodo: function(todo, callback) {
        db.update({
            id: todo.id
        }, todo, {}, callback);
    },
    deleteTodo: function(id, callback) {
        db.remove({
            id: id
        }, '', callback);
    }
}
return database;
}
module.exports.DatabaseStore = Database;


