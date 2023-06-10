const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = mongoose.Schema(
	{
		eventName: {
			type: String,
			minLength: [5, 'Event name must be at least 5 characters long.'],
			required: [true, 'Please enter an event name.'],
		},
		category: {
			type: String,
			required: [true, 'Please assign a category.'],
		},
		eventDate: {
			type: Date,
			required: [true, 'Set a date for the event.'],
			validate: [validator.isDate, 'Please enter a valid date.'],
		},
		details: {
			type: String,
			minLength: [10, 'Explain in more detail about the event.'],
		},
		tickets: {
			type: Number,
			min: [0, 'There are no more tickets for this event.'],
		},
		adminId: {
			type: String,
			required: true,
			validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);