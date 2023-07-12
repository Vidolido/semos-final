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

const getUserEvents = async (req, res) => {
	try {
		// TODO: Да исхендлам грешки
		let userEvents = await Events.find({ adminId: req.auth.id });

		return res.status(200).json(userEvents);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getSingleEvent = async (req, res) => {
	try {
		// TODO: Да исхендлам грешки
		let singleEvent = await Events.findOne({ _id: req.body.id });

		return res.status(200).json(singleEvent);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getRelatedEvents = async (req, res) => {
	try {
		let relatedEvents = await Events.find({ _id: { $in: req.body } }).select(
			'eventName eventDate location imageUrl'
		);
		console.log(relatedEvents, 'Events handler');
		res.status(200).send(relatedEvents);
	} catch (err) {
		console.log(err);
		let errors = handleErrors(err);
		res.status(500).json(errors);
	}
};

const getEventsByCategory = async (req, res) => {
	try {
		let evetnsByCat = await Events.find({ category: req.params.category });
		// console.log(evetnsByCat);
		if (!evetnsByCat.length) {
			return res
				.status(200)
				.send({ message: 'There are no events in this category.' });
		}
		return res.status(200).send(evetnsByCat);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const createEvent = async (req, res) => {
	// console.log(req.auth);
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
		// На овој начин само Account-от што го креирал Event-от, може да прави промени.
		// Да направам по accountType: admin, за да може само админ да прави промени.
		const upE = await Events.updateOne(
			{ _id: req.params.id, adminId: req.auth.id },
			req.body
		);
		if (!upE.matchedCount)
			return res.status(404).send({ message: 'No such event was found.' });

		if (!upE.modifiedCount)
			return res
				.status(200)
				.send({ message: 'Nothing was changed for this event.' });

		return res.status(200).send({ message: 'Update Successful' });
	} catch (err) {
		console.log(err);
		res.status(500).send('Internal server error.');
	}
};

const removeEvent = async (req, res) => {
	try {
		const rmE = await Events.deleteOne({ _id: req.params.id });
		if (!rmE.deletedCount) {
			throw {
				code: 400,
				errorMessage: 'Event does not exist.',
				for: 'eventName',
				message: 'Custom error',
			};
		}

		return res.status(200).send({ message: 'Event successfully deleted' });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

module.exports = {
	getAllEvents,
	getUserEvents,
	getSingleEvent,
	getRelatedEvents,
	getEventsByCategory,
	createEvent,
	updateEvent,
	removeEvent,
};
