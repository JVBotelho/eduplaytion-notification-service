const database = require('./database');
const typeorm = require("typeorm");

const connection = typeorm.createConnection(database);

const randomNames = [
	'Tyler',
	'Bob',
	'Sarah',
	'Jenny',
	'April',
	'Olivia',
	'Curtis',
	'Andi',
];

const randomText = [
	(name) => `Hello, ${name}.`,
	(name) => `What's new, ${name}?`,
	(name) => `${name} is playing tennis.`,
	(name) => `${name} is playing hockey.`,
	(name) => `You've got to do something about this soon, ${name}.`,
	(name) => `${name}, I'm really so unlucky!`,
	(name) => `All the best to ${name}!`,
	(name) => `${name}, It hasn't been that long.`,
	(name) => `${name} and I ate way too much last night.`,
	(name) => `Never mind what ${name} said.`,
	(name) => `I'm here because I need ${name}'s help.`,
	(name) => `I was thinking about ${name}.`,
	(name) => `${name} has been putting aside a little money each month.`,
];

function randomItemFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

async function seed() {
	await connection;
	console.log(`Database: Connection to PostgreSQL successful!`);
	console.log(`Starting seed...`);

	for (let seedCount = 0; seedCount < 20; seedCount++) {
		try {
			const name = randomItemFromArray(randomNames);
			const message = randomItemFromArray(randomText)(name);
			const notification = { message };
			await typeorm.getRepository('notifications').save(notification);
			console.log(`${seedCount}: Inserting ${message}`);
		} catch (error) {
			console.log('Unable to create a random notification.', error);
		}
	}

	console.log(`Finished. Shutting down...`);
}

seed();
