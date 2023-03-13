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

app.put('/api/notifications/:id/read', async (req, res, next) => {
	try {
		const notificationId = req.params.id;
		const notificationRepo = typeorm.getRepository('notifications');
		const notification = await notificationRepo.findOne({id: notificationId});
		if (!notification) {
			return res.status(404).send('NotificationEntity not found');
		}
		notification.read = true;
		await notificationRepo.save(notification);
		return res.status(200).send('NotificationEntity marked as read');
	} catch (err) {
		return next(err);
	}
});

app.put('/api/notifications/:id/unread', async (req, res, next) => {
	try {
		const notificationId = req.params.id;
		const notificationRepo = typeorm.getRepository('notifications');
		const notification = await notificationRepo.findOne({id: notificationId});
		if (!notification) {
			return res.status(404).send('NotificationEntity not found');
		}
		notification.read = false;
		await notificationRepo.save(notification);
		return res.status(200).send('NotificationEntity marked as unread');
	} catch (err) {
		return next(err);
	}
});

app.get('/api/notifications/:id', async (req, res, next) => {
	try {
		const notificationId = req.params.id;
		const notificationRepo = typeorm.getRepository('notifications');
		const notification = await notificationRepo.findOne({id: notificationId}, {relations: ['user']});
		if (!notification) {
			return res.status(404).send('NotificationEntity not found');
		}
		return res.json(notification);
	} catch (err) {
		return next(err);
	}
});

app.get('/api/notifications/user/:userId', async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const notificationRepo = typeorm.getRepository('notifications');
		const notifications = await notificationRepo.find({where: {user: userId}});
		return res.json(notifications);
	} catch (err) {
		return next(err);
	}
});

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, async () => {
	console.log(`NotificationAPI: Listening on port 3000`);
	connection.then(_ => console.log(`Database: Connection to PostgreSQL Database Established.`));
});
