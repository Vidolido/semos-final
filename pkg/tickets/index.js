const mongoose = require('mongoose');
const validator = require('validator');

const ticketSchema = mongoose.Schema({
	event: {
		type: mongoose.Types.ObjectId,
		requred: true,
		validate: [mongoose.Types.ObjectId.isValid, '{VALUE} is not a valid id'],
		ref: 'Event',
	},
	accountId: {
		type: mongoose.Types.ObjectId,
		requred: true,
		validate: [mongoose.Types.ObjectId.isValid, '{VALUE} is not a valid id.'],
	},
	ticketCount: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Ticket', ticketSchema);
