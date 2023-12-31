const mongoose = require('mongoose');
const config = require('../config');

const init = () => {
	const url = config.get('db').url;
	const username = config.get('db').username;
	const password = config.get('db').password;
	const dbname = config.get('db').dbname;
	const dsn = `mongodb+srv://${username}:${password}@${url}/${dbname}?retryWrites=true&w=majority`;

	mongoose
		.connect(dsn)
		.then(() => console.log('Connected to DB'))
		.catch((err) => console.log(err.message));
};

module.exports = {
	init,
};
