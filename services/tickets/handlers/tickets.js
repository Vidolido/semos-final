const Tickets = require('../../../pkg/tickets');

// TODO: Try/Catch

const userTickets = async (req, res) => {
	const userTickets = await Tickets.find({
		accountId: req.auth.id,
	});
	// console.log(userTickets);
	res.status(200).send(userTickets);
};

const buyTickets = async (req, res) => {
	// console.log(req.auth);
	const userTickets = await Tickets.find({
		accountId: req.auth.id,
		eventId: req.eventId,
		ticketCount: req.ticketCount || 1,
	});
	// console.log(userTickets);
	res.status(200).send(userTickets);
};

module.exports = {
	userTickets,
	buyTickets,
};
