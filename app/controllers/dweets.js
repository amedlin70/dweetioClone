var mongoose = require('mongoose');
var Dweet = mongoose.model('Dweet');

var c = require("../../config/constants");

exports.newDweetPost = function(req, res) {
	// Ensure thing length is less than MAX_SIZE, if not return error message
	console.log("req.body.length: ", JSON.stringify(req.body).length);
	if(JSON.stringify(req.body).length > c.constants.MAX_DWEET_SIZE)
		return res.json(Dweet.dweetFailure(c.messages.error414Msg));

	var dweet = new Dweet();
	dweet.thing = req.params.thing;
	dweet.created = new Date();
	dweet.content = req.body;

	createDweet(dweet, res);
}

exports.newDweet = function(req, res) {
	// Ensure thing length is less than MAX_SIZE, if not return error message
	var length = getLength(req.query);
	console.log("length: ", length);

	// Format data for insertion into database
	var dweet = new Dweet();
	dweet.thing = req.params.thing;
	dweet.created = new Date();
	dweet.content = parseContent(req.query);

	// Insert data into database
	createDweet(dweet, res);
}

exports.getLatest = function(req, res) {
	var thing = req.params.thing;

	Dweet.getLatest(thing, function(err, dweet) {
		if(err) return res.json(Dweet.dweetFailure(c.messages.error500Msg));
		if(!dweet[0]) return res.json(Dweet.dweetFailure(c.messages.error404Msg));
		res.json(Dweet.dweetResponse(c.messages.successGetMsg, dweet[0]));
	});
}

exports.getDweets = function(req, res) {
	var thing = req.params.thing;

	Dweet.getDweets(thing, function(err, dweets) {
		if(err) return res.json(Dweet.dweetFailure(c.messages.error500Msg));
		if(!dweets[0]) return res.json(Dweet.dweetFailure(c.messages.error404Msg));
		res.json(Dweet.dweetResponse(c.messages.successGetMsg, dweets));
	});
}

getLength = function(data) {
	var count = 0;
	for(var key in data) {
		console.log("key: ", key);
		if(typeof data[key] === 'object') {
			count += getLength(data[key]);
		}
		else {
			count += data[key].length;
		}
	}
	return count;
}

// Express is making all 
parseContent = function(data) {
	var doc = {};
	for(var key in data) {
		if(key == 'key') {
			// Ignore the key field, used for locking
		}
		else if(typeof data[key] === 'object') {
			doc[key] = parseContent(doc[key]);
		}
		else if(data[key].toLowerCase() === "true") {
			doc[key] = true;
		}
		else if(data[key].toLowerCase() === "false") {
			doc[key] = false;
		}
		else if(data[key].toLowerCase() === "null") {
			doc[key] = null;
		}
		else if(!isNaN(parseInt(data[key]))) {
			doc[key] = parseInt(data[key]);
		}
		else {
			doc[key] = data[key];
		}
	}
	return doc;
}

createDweet = function(dweet, res) {
	dweet.newDweet(function(err) {
		// Remove oldest dweet if 'thing' has more than MAX_DWEETS
		Dweet.countDweets(dweet.thing, function(err, count) {
			if(count > c.constants.MAX_DWEETS) Dweet.getLastDweet(dweet.thing, function(err, lastDweet) {
				dweetID = lastDweet[0]._id;
				Dweet.removeDweet(dweetID, function(err, docs){});
			});
		});

		// Filter out the _id and __v that is added by mongodb and mongoose
		var currDweet = {}
		currDweet.thing = dweet.thing;
		currDweet.created = dweet.created;
		currDweet.content = dweet.content;
		// Return response
		res.json(Dweet.dweetResponse(c.messages.successAddMsg, currDweet));
	});
}