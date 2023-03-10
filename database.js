const config = require("config");
const typeorm = require("typeorm");
const notifications = {
	"name": "notifications",
	"columns": {
		"id": {
			"primary": true,
			"generated": true
		},
		"message": {
			"type": "text"
		},
		"read": {
			"type": "boolean",
			"default": false
		}
	}
};

module.exports = {
	name: 'default',
	type: 'postgres',
	host: config.get('DB_HOST'),
	port: 5432,
	username: config.get('DB_USERNAME'),
	password: config.get('DB_PASSWORD'),
	database: config.get('DB_DATABASE'),
	entities: [new typeorm.EntitySchema(notifications)],
	logging: false,
	synchronize: true
};
