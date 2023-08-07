const config = require('../../pkg/config');
const db = require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const cart = require('./handlers/cart');

db.init();

const api = express();

api.use(express.json());

api.use(
	jwt.expressjwt({
		algorithms: ['HS256'],
		secret: config.get('security').jwt_secret,
	})
);

api.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

//routes
api.post('/api/v1/cart/create', cart.createCart);
api.get('/api/v1/cart/get', cart.getCart);
api.get('/api/v1/cart/getTotal', cart.getTotal);
api.post('/api/v1/cart/add', cart.addToCart);
api.delete('/api/v1/cart/remove/:id', cart.removeFromCart);

// no token
api.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).send({
			success: false,
			message: 'You need to be logged in to make changes.',
		});
	}
});

api.listen(config.get('services').cart.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [cart] successfully started on port',
		config.get('services').cart.port
	);
});
