//var async = require('async');

module.exports = function (app) {
	var dweets = require('../app/controllers/dweets');
	// var lock = require('../app/controllers/lock');

	// Basic dweet routes
	app.post('/dweet/for/:thing', dweets.newDweetPost);
	app.get('/dweet/for/:thing', dweets.newDweet);
	app.get('/get/latest/dweet/for/:thing', dweets.getLatest);
	app.get('/get/dweets/for/:thing', dweets.getDweets);

	// Lock routes
	// app.get('/generate/lock', lock.generate);
	// app.get('/lock/:thing', lock.lock);
	// app.get('/unlock/:thing', lock.unlock);
	// app.get('/remove/lock/:myLock', lock.removeLock);
}