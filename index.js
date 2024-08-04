



const path = require('path');
// load dependencies
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const server = require('http').createServer(app);
//Loading Routes
const webRoutes = require('./routes/web');
const { db } = require('./config/database');

env.config();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
	next();
  });
var options = {
	inflate: true,
	type: '*/*'
};
app.use(bodyParser.raw(options));



const decodeJson = require("unescape-json");

app.use(function (req, res, next) {
	try {
		req.body = decodeJson(req.body.toString());
	}
	catch (err) {
		console.log(err);
	}
	// s3logger.log('info', req.method + ': ' + req.path + "__" + JSON.stringify(req.body));
	next();
});

webRoutes(app);

server.listen(process.env.PORT || 3002);
console.info('\x1b[32m%s\x1b[0m', `✔️  Listening at ${process.env.PORT}` || 3000);

db.connect((err) => {
  if (!err)
    console.log('Connection Established Successfully');
  else
    console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
