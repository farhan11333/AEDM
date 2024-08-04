'use strict';
module.exports = function (app) {
	app.use('/home', require('../app/controllers/HomeController.js'));
	app.use('/ping', require('../app/controllers/PingController.js'));
	
};
