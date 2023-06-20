// 3rd party
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');

// config and custom
const config = require('../../pkg/config');
const auth = require('./handlers/auth');
const db = require('../../pkg/db');

db.init();

const api = express();

api.use(express.json());

api.use(
	jwt({
		algorithms: ['HS256'],
		secret: config.get('security').jwt_secret,
	}).unless({
		path: ['/api/v1/auth/', '/api/v1/auth/login', '/api/v1/auth/sign-in'],
	})
);

api.use((req, res, next) => {
	console.log(req.method, req.path);
	next();
});

api.get('/api/v1/auth/', auth.getAllAccounts);
api.post('/api/v1/auth/sign-in', auth.signIn);
api.post('/api/v1/auth/login', auth.login);

api.post('/api/v1/auth/validate', auth.validate);

api.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(403).send({
			success: false,
			message: 'No token provided.',
		});
	}
});

api.listen(config.get('services').auth.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [auth] successfully started on port',
		config.get('services').auth.port
	);
});
