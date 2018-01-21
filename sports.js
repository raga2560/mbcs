
function SportsDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof SportsDAO)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new SportsDAO(db);
    }

    var sportsdata = db.collection("sports");
	
	
	
	
	
//---------------------------------1.1-------------------------------------------//
	
	
	this.insertplayer = function (player,  callback) {
        "use strict";
        
		

        

		  
			
			sportsdata.insert(player, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new player");
                return callback(null, result[0]);
            }

            return callback(err, null);
			});
		

		
		
    }
	
	
	this.getplayer = function(player, callback) {
        "use strict";
		
        sportsdata.findOne({'name': player.name}, function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getplayers = function( callback) {
        "use strict";
		
        sportsdata.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	
	
}

module.exports.SportsDAO = SportsDAO;
