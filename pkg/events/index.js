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
// const Event = mongoose.model('events', {
// 	eventName: {
// 		type: String,
// 		minLength: [5, 'Event name must be at least 5 characters long.'],
// 		required: [true, 'Please enter an event name.'],
// 	},
// 	category: {
// 		type: String,
// 		required: [true, 'Please assign a category.'],
// 	},
// 	eventDate: {
// 		type: Date,
// 		required: [true, 'Set a date for the event.'],
// 		validate: [validator.isDate, 'Please enter a valid date.'],
// 	},
// 	createdAt: {
// 		type: Date,
// 	},
// 	details: {
// 		type: String,
// 		minLength: [10, 'Explain in more detail about the event.'],
// 	},
// 	tickets: {
// 		type: Number,
// 		min: [10, 'You need more than 10 tickets to create an event.'],
// 	},
// 	adminId: {
// 		type: mongoose.Types.ObjectId,
// 	},
// });

// const getAll = async () => {
// 	return Event.find({});
// };

// const getEventsByCategory = async (category) => {
// 	return Event.find({ category });
// };

// const create = async (data) => {
// 	const newEvent = new Event(data);
// 	return newEvent.save();
// };

// const update = async (id, uid, data) => {
// 	return Event.updateOne({ _id: id, author_id: uid }, data);
// };
// const update = async (id, data) => {
// 	return Event.updateOne({ _id: id }, data);
// };

// const remove = async (id, uid) => {
// 	return Event.deleteOne({ _id: id, author_id: uid });
// };
// const remove = async (id) => {
// 	return Event.deleteOne({ _id: id });
// };

// module.exports = {
// 	getAll,
// 	getEventsByCategory,
// 	create,
// 	update,
// 	remove,
// };
