const Tickets = require('../../../pkg/tickets');
const Event = require('../../../pkg/events');

const userTickets = async (req, res) => {
	try {
		const userTickets = await Tickets.find({
			accountId: req.auth.id,
		}).populate({
			path: 'event',
			model: Event,
			select: {
				eventName: 1,
				eventDate: 1,
				details: 1,
				location: 1,
				eventImage: 1,
			},
		});
		// console.log(userTickets);
		res.status(200).send(userTickets);
	} catch (err) {
		console.log(err);
	}
};

const buyTickets = async (req, res) => {
	const payload = [];
	try {
		const events = req.body.map((event) => {
			payload.push({
				event: event.event._id,
				accountId: req.auth.id,
				ticketCount: event.numberOfTickets,
			});
		});
		await Tickets.insertMany(payload);

		res.status(200).send({ message: 'Thank You' });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	userTickets,
	buyTickets,
};
