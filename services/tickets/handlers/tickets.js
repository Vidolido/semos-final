const Tickets = require('../../../pkg/tickets');

// TODO: Try/Catch

const userTickets = async (req, res) => {
	try {
		const userTickets = await Tickets.find({
			accountId: req.auth.id,
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
				eventId: event.event._id,
				accountId: req.auth.id,
				ticketCount: event.numberOfTickets,
			});
		});
		// console.log(payload);
		const userTickets = await Tickets.insertMany(payload);

		res.status(200).send({ message: 'Thank You' });
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	userTickets,
	buyTickets,
};
