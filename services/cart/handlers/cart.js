// const mongoose = require('mongoose');

// models
const Event = require('../../../pkg/events');
const Cart = require('../../../pkg/cart');

// config and custom
const config = require('../../../pkg/config');

// TODO: Оваа функција да ја сместам во misc секаде ја користам
// треба да прима параметри, err и errObject
const handleErrors = (err) => {
	console.log(err);

	let errors = {
		accountId: '',
	};
	// unique error handle
	if (err.code === 11000) {
		errors.accountId = 'Something went wrong, please try again.';
	}
	if (err.message.includes('Account validation failed')) {
		// TODO: Да проверам убаво какви грешки се случуваат тука

		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	} else if (err.message.includes('Custom error')) {
		errors[err.for] = err.errorMessage;
	}
	console.log(errors);

	return errors;
};

const createCart = async (req, res) => {
	try {
		const cart = await Cart.create({ accountId: req.auth.id, cartItems: [] });
		res.status(200).send(cart);
	} catch (err) {
		// console.log(err);
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ accountId: req.auth.id }).populate({
			path: 'cartItems',
			populate: {
				path: 'event',
				model: Event,
				select: {
					eventName: 1,
					eventDate: 1,
					location: 1,
					ticketPrice: 1,
				},
			},
		});
		return res.status(200).send(cart);
	} catch (err) {
		const errors = handleErrors(err);
		return res.status(500).json({ errors });
	}
};

const addToCart = async (req, res) => {
	let cart = await Cart.findOne({ accountId: req.auth.id });

	try {
		if (!cart) {
			throw {
				code: 400,
				errorMessage: 'User does not have a cart.',
				for: 'accountId',
				message: 'Custom error',
			};
		}

		// TODO: Да поставам услов, доколку го има настанот, да прашам
		// дали корисникот сака да докупи карти за овој настан.
		let isInArray = cart.cartItems.some((item) => {
			console.log(item, 'VO ISINARRAY');
			return item.event.equals(req.body.event);
		});
		const payload = {
			event: req.body.event,
			numberOfTickets: req.body.numberOfTickets,
		};
		// console.log(cart.cartItems, req.body.itemId, req.body.numberOfTickets);
		console.log(isInArray);
		// const addTicketsToCart = await Cart.updateOne( // vaka beshe
		await Cart.updateOne(
			{ accountId: req.auth.id },
			{
				cartItems: !isInArray ? [...cart.cartItems, payload] : cart.cartItems,
			}
		);
		// return res.status(200).send(addTicketsToCart);
		res.status(200).send({ message: 'Event added to cart' });
	} catch (err) {
		console.log(err, 'epa ovoa');
		const errors = handleErrors(err);
		return res.status(500).json({ errors });
	}
};

module.exports = {
	createCart,
	getCart,
	addToCart,
};
