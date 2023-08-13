const config = require('../../pkg/config');
const db = require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const events = require('./handlers/events');

db.init();

const api = express();

api.use(express.json());

api.use(
	jwt
		.expressjwt({
			algorithms: ['HS256'],
			secret: config.get('security').jwt_secret,
		})
		.unless({
			path: [
				'/api/v1/events/',
				'/api/v1/events/search',
				'/api/v1/events/get-hero',
				'/api/v1/events/single-event',
				'/api/v1/events/music',
				'/api/v1/events/comedy',
			],
		})
);
api.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

api.get('/api/v1/events', events.getAllEvents);
api.get('/api/v1/events/get-hero', events.getHeroEvent);
api.post('/api/v1/events/search', events.searchEvents);
api.post('/api/v1/events/single-event', events.getSingleEvent);
api.post('/api/v1/events/related', events.getRelatedEvents);
api.post('/api/v1/events/user-events', events.getUserEvents);
api.get('/api/v1/events/:category', events.getEventsByCategory);
api.post('/api/v1/events/create', events.createEvent);
api.put('/api/v1/events/:id', events.updateEvent);
api.delete('/api/v1/events/:id', events.removeEvent);

api.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).send({
			success: false,
			message: 'You need to be logged in to make changes.',
		});
	}
});

api.listen(config.get('services').events.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [events] successfully started on port',
		config.get('services').events.port
	);
});
