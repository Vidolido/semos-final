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
	accountImage: {
		type: String,
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// accountSchema.path('password').validate(function (value) {
// 	console.log(validator.isStrongPassword(value));
// 	// When running in `validate()` or `validateSync()`, the
// 	// validator can access the document using `this`.
// 	// When running with update validators, `this` is the Query,
// 	// **not** the document being updated!
// 	// Queries have a `get()` method that lets you get the
// 	// updated value.
// 	console.log(this._update);
// 	console.log(value, 'VALUE');
// 	// if (this.get('name') && this.get('name').toLowerCase().indexOf('red') !== -1) {
// 	//   return value === 'red';
// 	// }
// 	return validator.isStrongPassword(value);
// });

accountSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// accountSchema.pre('updateOne', async function (next) {
// 	console.log('query criteria', this.getQuery()); // { _id: 5bc8d61f28c8fc16a7ce9338 }
// 	console.log(this._update); // { '$set': { name: 'I was updated!' } }
// 	console.log(this._conditions);
// 	console.log(this.options);
// 	this.options.runValidators = true;
// 	next();
// });

module.exports = mongoose.model('Account', accountSchema);
