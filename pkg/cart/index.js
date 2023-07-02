const mongoose = require('mongoose');
const validator = require('validator');

const cartSchema = mongoose.Schema({
	accountId: {
		type: mongoose.Types.ObjectId,
		unique: true,
		required: true,
		ref: 'Account',
		validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
	},
	cartItems: [
		{
			type: mongoose.Types.ObjectId,
			unique: true,
			ref: 'Events',
			validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
		},
	],
});

module.exports = mongoose.model('Cart', cartSchema);
