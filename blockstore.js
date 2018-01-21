



function blockstore(db) {
	
	
	var dbblockstore = db.collection("blockstore");

 
    this.getAllTransactions = function(callback) {
        dbblockstore.find().toArray(callback);
    },
	
	
	
	this.getAllAssetsDB = function(callback) {
        dbblockstore.find({},{'details':1}).toArray(callback);
    },
    this.saveTransaction = function(todo, callback) {
        dbblockstore.insert(todo, callback);
    },
	this.getTransactionbyId = function(id, callback) {
        dbblockstore.findOne({
            id: id
        }, callback);
    },
	this.getTransactionbyObject = function(object, callback) {
        dbblockstore.findOne({
            id: object.id
        }, callback);
    },
    
    this.updateTransaction = function(todo, callback) {
        dbblockstore.update({
            id: todo.id
        }, todo, {}, callback);
    },
    this.deleteTransaction = function(id, callback) {
        dbblockstore.remove({
            id: id
        }, '', callback);
    }
}
 
module.exports.blockstore = blockstore;



