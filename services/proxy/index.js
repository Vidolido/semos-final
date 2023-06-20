const config = require('../../pkg/config');
const express = require('express');
const proxy = require('express-http-proxy');

const api = express();

api.use(
	'/api/v1/auth',
	proxy(`http://127.0.0.1:${config.get('services').auth.port}`, {
		proxyReqPathResolver: (req) =>
			`http://127.0.0.1:${config.get('services').auth.port}/api/v1/auth${
				req.url
			}`,
	})
);

api.use(
	'/api/v1/events',
	proxy(`http://127.0.0.1:${config.get('services').events.port}`, {
		proxyReqPathResolver: (req) =>
			`http://127.0.0.1:${config.get('services').events.port}/api/v1/events${
				req.url
			}`,
	})
);

api.use(
	'/api/v1/tickets',
	proxy(`http://127.0.0.1:${config.get('services').tickets.port}`, {
		proxyReqPathResolver: (req) =>
			`http://127.0.0.1:${config.get('services').tickets.port}/api/v1/tickets${
				req.url
			}`,
	})
);

api.use(
	'/api/v1',
	proxy(`http://127.0.0.1:${config.get('services').proxy.port}`, {
		proxyReqPathResolver: (req) =>
			`http://127.0.0.1:${config.get('services').proxy.port}${req.url}`,
	})
);

api.listen(config.get('services').proxy.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [proxy] successfully started on port',
		config.get('services').proxy.port
	);
});
