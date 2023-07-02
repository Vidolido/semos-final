const mongoose = require('mongoose');
const validator = require('validator');

const cartItemSchema = mongoose.Schema(
	{
		eventId: {
			type: mongoose.Types.ObjectId,
			unique: true,
			ref: 'Events',
			validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
		},
		numberOfTickets: {
			type: Number,
			min: [1, 'You have to buy at least one ticket.'],
			validate: [validator.isInt, 'Something went wrong.'],
		},
	},
	{ _id: false }
);

const cartSchema = mongoose.Schema({
	accountId: {
		type: mongoose.Types.ObjectId,
		unique: true,
		required: true,
		ref: 'Account',
		validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
	},
	cartItems: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
