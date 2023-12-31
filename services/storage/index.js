const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const { expressjwt: jwt } = require('express-jwt');
const storage = require('./handlers/storage');

const api = express();

api.use(
	jwt({
		algorithms: ['HS256'],
		secret: config.get('security').jwt_secret,
	}).unless({
		path: [/([/|.|\w|\s])*\.(?:jpg|jpeg|pjpeg|png|gif)$/g],
	})
);

api.use(express.json());
api.use(fileUpload());

api.post('/api/v1/storage/upload', storage.upload);
api.get('/api/v1/storage/download/:file', storage.download);

api.listen(config.get('services').storage.port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(
		'Service [storage] successfully started on port',
		config.get('services').storage.port
	);
});
