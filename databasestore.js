
function Database(dbsent) {
 
 var db = dbsent.collection("dbdata");
var database = {
 
    getAllTodos: function(callback) {
        db.find().toArray(callback);
    },
    saveTodo: function(todo, callback) {
        db.insert(todo, callback);
    },
    deletelink: function(linktodelete, callback) {
	db.remove({linkaddress: linktodelete}, callback);
    },
    clearRecords: function(bankpublickey, callback) {
	db.remove({bankpubkey: bankpublickey}, 
	db.find({bankpubkey: bankpublickey}).toArray(callback));
    },
    getUserlinks: function(userpublickey, callback) {
	db.find({publickey: userpublickey}).toArray(callback);
    },
    getBanklinks: function(bankpublickey, callback) {
	db.find({bankpubkey: bankpublickey}).toArray(callback);
    },
    findredeemscript: function(todo, callback) {
	db.find({redeemscript: todo.redeemscript}).toArray(callback);
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


