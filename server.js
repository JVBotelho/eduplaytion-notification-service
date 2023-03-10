require('reflect-metadata');
const config = require('config');
const typeorm = require('typeorm');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const database = require('./database');

const connection = typeorm.createConnection(database);

const app = express();

app.get('/api/notifications', (req, res, next) => {
	typeorm.getRepository('notifications').find({}).then((data) => {
		res.json(data);
	});
});

app.get('/api/notifications/unread', (req, res, next) => {
	typeorm.getRepository('notifications').find({where: {read: false}}).then((data) => {
		res.json(data);
	});
});

app.get('/api/notifications/unread/count', (req, res, next) => {
	typeorm.getRepository('notifications').find({where: {read: false}}).then((data) => {
		res.json(data.length);
	});
});

app.get('/api/notifications/read', (req, res, next) => {
	typeorm.getRepository('notifications').find({where: {read: true}}).then((data) => {
		res.json(data);
	});
});

app.get('/api/notifications/read/count', (req, res, next) => {
	typeorm.getRepository('notifications').find({where: {read: true}}).then((data) => {
		res.json(data.length);
	});
});

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, async () => {
	console.log(`NotificationAPI: Listening on port 3000`);
	connection.then(_ => console.log(`Database: Connection to PostgreSQL Database Established.`));
});
