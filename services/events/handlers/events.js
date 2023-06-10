const Events = require('../../../pkg/events');

//TODO: Да ставам соодветни статуси.

const handleErrors = (err) => {
	let errors = {
		eventName: '',
		category: '',
		eventDate: '',
		details: '',
		tickets: '',
		adminId: '',
	};
	console.log(err.errors, 'OVOJ');
	if (err.message.includes('Event validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	} else if (err.message.includes('Custom error')) {
		errors[err.for] = err.errorMessage;
		//TODO: да проверам што ќе се случи во случај на повеќе custom errors -- проверив, не ги фаќа.
	}

	return errors;
};

const getAllEvents = async (req, res) => {
	try {
		let allEvents = await Events.find({});
		return res.status(200).send(allEvents);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getEventsByCategory = async (req, res) => {
	try {
		let evetnsByCat = await Events.find({ category: req.params.category });
		return res.status(200).send(evetnsByCat);
	} catch (err) {
		return res.status(500).send('Internal server error.');
	}
};

const createEvent = async (req, res) => {
	console.log(req.auth);
	try {
		// TODO: id(admin) ...
		if (!req.auth) {
			throw {
				code: 400,
				errorMessage: 'You mustt be logged in to create events.',
				for: 'adminId',
				message: 'Custom error',
			};
		}
		let payload = {
			...req.body,
			adminId: req.auth.id,
		};
		let newEvent = await Events.create(payload);
		return res.status(201).send(newEvent);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const updateEvent = async (req, res) => {
	try {
		const upE = await Events.update(req.params.id, req.body);
		updateOne({ _id: id, author_id: uid }, data);
		if (!upE.matchedCount)
			return res.status(404).send({ message: 'No such event was found.' });

		if (!upE.modifiedCount)
			return res
				.status(200)
				.send({ message: 'Nothing was changed for this event.' });

		return res.status(200).send({ message: 'Update Successful' });
	} catch (err) {
		res.status(500).send('Internal server error.');
	}
};

const removeEvent = async (req, res) => {
	try {
		const rmE = await Events.remove(req.params.id);
		if (!rmE.deletedCount)
			return res.status(404).send({ message: 'No such event was found.' });

		return res.status(200).send({ message: 'Event successfully deleted' });
	} catch (err) {
		res.status(500).send('Internal server error.');
	}
};

module.exports = {
	getAllEvents,
	getEventsByCategory,
	createEvent,
	updateEvent,
	removeEvent,
};
