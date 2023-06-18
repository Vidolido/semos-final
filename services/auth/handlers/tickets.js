const Tickets = require('../../../pkg/tickets');

const userTickets = async (req, res) => {
	const userTickets = await Tickets.find({
		accountId: req.accountId,
	});
	console.log(userTickets);
	res.status(200).send(userTickets);
};

const buyTickets = async (req, res) => {
	const userTickets = await Tickets.find({
		accountId: req.accountId,
		eventId: req.eventId,
	});
	console.log(userTickets);
	res.status(200).send('The route works.');
};

module.exports = {
	userTickets,
	buyTickets,
};
