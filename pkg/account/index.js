const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const accountSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email field is required.'],
		unique: true,
		validate: [validator.isEmail, 'Please provide a valid email.'],
	},
	password: {
		type: String,
		required: [true, 'Password field is required.'],
		minLength: [3, 'Password must be at least 3 characters long.'],
		validate: [validator.isStrongPassword, 'Password not strong enough.'],
	},
	fullName: {
		type: String,
		required: [true, 'Please enter your full name.'],
		minLength: [3, 'Name field must be at least 3 characters.'],
		maxLength: [30, 'Name field must be at least 3 characters.'],
	},
	accountType: {
		type: String,
	},
});

accountSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model('Account', accountSchema);
