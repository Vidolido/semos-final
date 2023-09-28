const mongoose = require('mongoose');
const validator = require('validator');

const eventSchema = mongoose.Schema({
	eventName: {
		type: String,
		minLength: [2, 'Event name must be at least 5 characters long.'],
		required: [true, 'Please enter an event name.'],
	},
	category: {
		type: String,
		required: [true, 'Please assign a category.'],
		enum: {
			values: ['comedy', 'music'],
			message: 'Please select a category',
		},
	},
	eventDate: {
		type: Date,
		required: [true, 'Set a date for the event.'],
		validate: [validator.isDate, 'Please enter a valid date.'],
	},
	location: {
		type: String,
		required: [true, 'Please enter a location for the event.'],
	},
	details: {
		type: String,
		required: true,
		minLength: [10, 'Explain in more detail about the event.'],
	},
	eventImage: {
		type: String,
	},
	tickets: {
		type: Number,
		min: [0, 'There are no more tickets for this event.'],
	},
	ticketPrice: {
		type: Number,
		min: [0, 'Please enter a ticket price.'],
	},
	relatedEvents: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Event',
			validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
		},
	],
	adminId: {
		type: String,
		required: true,
		validate: [mongoose.Types.ObjectId.isValid, 'Something went wrong.'],
	},
});

module.exports = mongoose.model('Event', eventSchema);
