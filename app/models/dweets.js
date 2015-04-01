var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var c = require('../../config/constants');

var dweetSchema = new Schema({
	thing: String,
	created:  {type: Date, default: Date.now},
	content: {}
});

console.log("MAX_TIME:", c.constants.MAX_TIME);
dweetSchema.index({created: 1}, {expireAfterSeconds: c.constants.MAX_TIME});

dweetSchema.methods = {
	newDweet: function(cb) {
		this.save(cb);
	}
};

dweetSchema.statics = {
	countDweets: function(thing, cb) {
		this.find({"thing": thing})
			.count()
			.exec(cb);
	},

	getDweets: function(thing, cb) {
		this.find({"thing": thing}, {_id:0, __v:0})
			.sort({'created': -1})
			.exec(cb);
	},

	getLatest: function(thing, cb) {
		this.find({"thing": thing}, {_id:0, __v:0})
			.sort({'created': -1})
			.limit(1)
			.exec(cb);
	},

	getLastDweet: function(thing, cb) {
		this.find({"thing": thing})
			.sort({'created': 1})
			.limit(1)
			.exec(cb);
	},

	dweetFailure: function(message) {
		var doc = {};
		doc["this"] = message.thisMsg;
		doc["with"] = message.withMsg;
		doc["because"] = message.becauseMsg;
		return doc;
	},

	dweetResponse: function(message, dweet) {
		var doc = {};
		doc["this"] = message.thisMsg;
		doc["by"] = message.byMsg;
		doc["the"] = message.theMsg;
		doc["with"] = dweet;

		return doc;
	},

	removeDweet: function(dweetId, cb) {
		this.remove({"_id": mongoose.Types.ObjectId(dweetId)})
			.exec(cb);
	}
};

mongoose.model('Dweet', dweetSchema);