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
		},
		"userId": {
			"type": "int"
		}
	},
	"relations": {
		"user": {
			"type": "many-to-one",
			"target": "users"
		}
	}
};

const users = {
	"name": "users",
	"columns": {
		"id": {
			"primary": true,
			"generated": true
		},
		"name": {
			"type": "varchar"
		},
		"email": {
			"type": "varchar"
		}
	},
	"relations": {
		"notifications": {
			"type": "one-to-many",
			"target": "notifications",
			"inverseSide": "user"
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
	entities: [new typeorm.EntitySchema(notifications), new typeorm.EntitySchema(users)],
	logging: false,
	synchronize: true
};
