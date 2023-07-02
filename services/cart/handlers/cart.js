const mongoose = require('mongoose');

// models
const Cart = require('../../../pkg/cart');

// config and custom
const config = require('../../../pkg/config');

// TODO: Да направам да се креира кошница во момент кога се креира account
const handleErrors = (err) => {
	let errors = {
		accountId: '',
	};
	// unique error handle
	if (err.code === 11000) {
		errors.accountId = 'Something went wrong, please try again.';
	}

	if (err.message.includes('Account validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	} else if (err.message.includes('Custom error')) {
		errors[err.for] = err.errorMessage;
	}

	return errors;
};

const createCart = async (req, res) => {
	// можно е да не ми треба овој handler
	try {
		const cart = await Cart.create({ accountId: req.auth.id, cartItems: [] });
		res.status(200).send(cart);
	} catch (err) {
		// console.log(err);
		const errors = handleErrors(err);
		res.status(500).json({ errors });
	}
};

const addToCart = async (req, res) => {
	// if (!cart.length) {
	// 	cart = await Cart.create({ accountId: req.auth.id, cartItems: [] });
	let cart = await Cart.findOne({ accountId: req.auth.id });
	const { ObjectId } = mongoose.Types;
	// }
	try {
		if (!cart) {
			throw {
				code: 400,
				errorMessage: 'User does not have a cart.',
				for: 'accountId',
				message: 'Custom error',
			};
		}
		// console.log(cart.cartItems[0], new ObjectId(req.body.cartItems));
		// let addTo = new ObjectId(req.body.cartItems);
		let isInArray = cart.cartItems.some((item) => {
			return item.equals(req.body.cartItems);
		});
		console.log(isInArray);
		// console.log(cart.cartItems, req.body.cartItems, addTo, 'OVOA GO PRINTAM');
		const addTicketsToCart = await Cart.updateOne(
			{ accountId: req.auth.id },
			{
				cartItems: !isInArray
					? [...cart.cartItems, req.body.cartItems]
					: [...cart.cartItems],
			}
		);
		// !cart.cartItems && res.status(200).send({ message: 'Cart is empty' });
		// console.log(!cart.cartItems && 'Cart is empty');
		return res.status(200).send(addTicketsToCart);
	} catch (err) {
		console.log(err, 'epa ovoa');
		return res.status(500).send('Internal Server Error.');
	}
};

module.exports = {
	createCart,
	addToCart,
};
