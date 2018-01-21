

function todos(db) {
	
	
	var dbtodos = db.collection("todos");

 
    this.getAllTodos = function(callback) {
        dbtodos.find().toArray(callback);
    },
    this.saveTodo = function(todo, callback) {
        dbtodos.insert(todo, callback);
    },
    this.updateTodo = function(todo, callback) {
        dbtodos.update({
            id: todo.id
        }, todo, {}, callback);
    },
    this.deleteTodo = function(id, callback) {
        dbtodos.remove({
            id: id
        }, '', callback);
    }
}
 
module.exports.todos = todos;



