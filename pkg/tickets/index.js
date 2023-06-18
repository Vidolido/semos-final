const mongoose = require('mongoose');
const validator = require('validator');

const ticketSchema = mongoose.Schema({
	eventId: {
		type: String,
		requred: true,
		validate: [mongoose.Types.ObjectId.isValid, '{VALUE} is not a valid id'],
	},
	accountId: {
		type: String,
		requred: true,
		validate: [mongoose.Types.ObjectId.isValid, '{VALUE} is not a valid id.'],
	},
	ticketCount: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Ticket', ticketSchema);
