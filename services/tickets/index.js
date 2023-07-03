const config = require('../../pkg/config');
const db = require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const tickets = require('./handlers/tickets');

db.init();

const api = express();

api.use(express.json());

api.use(
	jwt.expressjwt({
		algorithms: ['HS256'],
		secret: config.get('security').jwt_secret,
	})
	// .unless({
	// 	path: ['/api/v1/tickets/', '/api/v1/buy-tickets'],
	// }) // да го трнгам ова, корисникот мора да биде логиран.
);
api.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

api.get('/api/v1/tickets', tickets.userTickets);
api.post('/api/v1/buy-tickets', tickets.buyTickets);

api.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).send({
			success: false,
			message: 'You need to be logged in.',
		});
	}
});

api.listen(config.get('services').tickets.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [tickets] successfully started on port',
		config.get('services').tickets.port
	);
});
