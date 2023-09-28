const Event = require('../../../pkg/events');

const handleErrors = (err) => {
	let errors = {
		eventName: '',
		category: '',
		eventDate: '',
		eventImage: '',
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
	}

	return errors;
};

const getAllEvents = async (req, res) => {
	try {
		let allEvents = await Event.find({});
		return res.status(200).send(allEvents);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getUserEvents = async (req, res) => {
	try {
		let userEvents = await Event.find({ adminId: req.auth.id });

		return res.status(200).json(userEvents);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getHeroEvent = async (req, res) => {
	try {
		let events = await Event.find({}).limit(10);
		if (!events.length) {
			return res.status(200).send({ message: 'No events' });
		} else {
			let random = Math.floor(Math.random() * events.length);
			const hero = events[random];
			return res.status(200).send(hero);
		}
	} catch (err) {
		console.log(err);
		let errors = handleErrors(err);
		res.status(500).json(errors);
	}
};

const getSingleEvent = async (req, res) => {
	try {
		let singleEvent = await Event.findOne({ _id: req.body.id }).populate({
			path: 'relatedEvents',
			model: Event,
			select: {
				eventName: 1,
				eventDate: 1,
				eventImage: 1,
				details: 1,
				location: 1,
				ticketPrice: 1,
			},
		});

		return res.status(200).json(singleEvent);
	} catch (err) {
		console.log(err);
		return res.status(500).send('Internal server error.');
	}
};

const getRelatedEvents = async (req, res) => {
	try {
		let relatedEvents = await Event.find({ _id: { $in: req.body } }).select(
			'eventName eventDate location eventImage'
		);
		res.status(200).send(relatedEvents);
	} catch (err) {
		console.log(err);
		let errors = handleErrors(err);
		res.status(500).json(errors);
	}
};

const getEventsByCategory = async (req, res) => {
	try {
		let evetnsByCat = await Event.find({ category: req.params.category });
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

const searchEvents = async (req, res) => {
	let { searchTerm } = req.body;
	try {
		const search = await Event.find({
			eventName: { $regex: `${searchTerm}`, $options: 'i' },
		});

		return res.status(200).send(search);
	} catch (err) {
		console.log(err);
		let errors = handleErrors(err);
		res.status(500).json(errors);
	}
};

const createEvent = async (req, res) => {
	try {
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
		let newEvent = await Event.create(payload);
		return res.status(201).send(newEvent);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const updateEvent = async (req, res) => {
	console.log(req.body, 'ova sakame');
	let filteredOptions = Object.fromEntries(
		Object.entries(req.body).filter(
			([k, v]) => k !== '0' && k !== '_id' && k !== '__v'
		)
	);
	console.log(filteredOptions);
	try {
		const upE = await Event.updateOne({ _id: req.params.id }, filteredOptions);
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
		const rmE = await Event.deleteOne({ _id: req.params.id });
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
	getHeroEvent,
	getSingleEvent,
	getRelatedEvents,
	getEventsByCategory,
	searchEvents,
	createEvent,
	updateEvent,
	removeEvent,
};
