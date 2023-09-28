// models
const Event = require('../../../pkg/events');
const Cart = require('../../../pkg/cart');

const handleErrors = (err) => {
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

	return errors;
};

const createCart = async (req, res) => {
	try {
		const cart = await Cart.create({ accountId: req.auth.id, cartItems: [] });
		res.status(200).send(cart);
	} catch (err) {
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
					eventImage: 1,
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

		let isInArray = cart.cartItems.some((item) => {
			return item.event.equals(req.body.event);
		});
		const payload = {
			event: req.body.event,
			numberOfTickets: req.body.numberOfTickets,
		};
		await Cart.updateOne(
			{ accountId: req.auth.id },
			{
				cartItems: !isInArray ? [...cart.cartItems, payload] : cart.cartItems,
			}
		);
		res.status(200).send({ message: 'Event added to cart' });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		return res.status(500).json({ errors });
	}
};

const getTotal = async (req, res) => {
	try {
		const cart = await Cart.findOne({ accountId: req.auth.id }).populate({
			path: 'cartItems',
			populate: {
				path: 'event',
				model: Event,
				select: {
					ticketPrice: 1,
				},
			},
		});

		if (cart.cartItems) {
			let total = 0;
			cart.cartItems.forEach((item) => {
				total += item.numberOfTickets * item.event.ticketPrice;
			});
			return res.status(200).send({ total });
		}

		if (!cart.cartItems) {
			return res
				.status(400)
				.send({ message: 'You have no items in your cart.' });
		}
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const removeFromCart = async (req, res) => {
	try {
		const { id } = req.params;
		const cart = await Cart.findOne({ accountId: req.auth.id });

		if (cart.cartItems) {
			let filtered = cart.cartItems.filter((item) => !item.event.equals(id));
			await Cart.updateOne({ accountId: req.auth.id }, { cartItems: filtered });
			return res.status(200).send({ message: 'Item removed from cart.' });
		}
		if (!cart.cartItems) {
			return res
				.status(400)
				.send({ message: 'You have no items in your cart.' });
		}
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const clearCart = async (req, res) => {
	try {
		await Cart.updateOne(
			{ accountId: req.auth.id },
			{ $set: { cartItems: [] } }
		);

		res.status(200).send({ message: 'Cart Cleared.' });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

module.exports = {
	createCart,
	getCart,
	addToCart,
	getTotal,
	removeFromCart,
	clearCart,
};
