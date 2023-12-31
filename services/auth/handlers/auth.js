// 3rd party
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const mg = require('nodemailer-mailgun-transport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// moddels
const Account = require('../../../pkg/account');
const Cart = require('../../../pkg/cart');

// config and custom
const config = require('../../../pkg/config');

const handleErrors = (err) => {
	let errors = {
		email: '',
		password: '',
		fullName: '',
		accountId: '',
	};

	// unique error handle
	if (err.code === 11000) {
		errors.email = 'Email already in use.';
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

const signIn = async (req, res) => {
	const { fullName, email, password, confirmPassword } = req.body;
	let collectionLength = await Account.count();
	try {
		if (password !== confirmPassword) {
			throw {
				code: 400,
				errorMessage: 'Passwords do not match',
				for: 'password',
				message: 'Custom error',
			};
		}
		let newAccount = await Account.create({
			fullName,
			email,
			password,
			accountImage: '',
			accountType: collectionLength > 0 ? 'customer' : 'admin',
		});
		await Cart.create({
			accountId: newAccount._id,
			cartItems: [],
		});
		const payload = {
			fullName: newAccount.fullName,
			email: newAccount.email,
			accountType: newAccount.accountType,
			id: newAccount._id,
		};
		const token = jwt.sign(payload, config.get('security').jwt_secret, {
			expiresIn: '2d',
		});
		res.status(201).send({ token });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const acc = await Account.findOne({ email });
		if (!acc) {
			throw {
				code: 400,
				errorMessage: 'Incorrect email or password.',
				for: 'email',
				message: 'Custom error',
			};
		}
		if (!bcrypt.compareSync(password, acc.password)) {
			throw {
				code: 400,
				errorMessage: 'Incorrect email or password.',
				for: 'password',
				message: 'Custom error',
			};
		}

		const payload = {
			email: acc.email,
			firstname: acc.firstname,
			lastname: acc.lastname,
			accountType: acc.accountType,
			id: acc._id,
		};
		const token = jwt.sign(payload, config.get('security').jwt_secret, {
			expiresIn: '2d',
		});
		res.status(201).send({ token });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};

const forgotPassword = async (req, res) => {
	const user = await Account.findOne({ email: req.body.email });

	if (!user) {
		return res.status(400).send('There is no user with that email.');
	}
	const resetToken = crypto.randomBytes(32).toString('hex');
	let passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	let passwordResetExpires = Date.now() + 30 * 60 * 1000;
	const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
	let payload = {
		passwordResetToken,
		passwordResetExpires,
	};
	try {
		await Account.updateOne(
			{
				_id: user._id,
			},
			payload
		);

		const message = `Forgoth your password? Submit this link: <a href=${resetUrl}>${resetUrl}</a>.\n If you did not request this, please ignore this email and your password will remain unchanged.`;

		const auth = {
			auth: {
				api_key: config.get('mailgun').api_key,
				domain: config.get('mailgun').domain,
			},
		};
		let transporter = nodemailer.createTransport(mg(auth));

		let mailOptions = {
			from: 'test@mailgun.org',
			to: 'levkovskigoce04@gmail.com',
			subject: 'Ticket Blaster Password Reset',
			html: message,
		};

		const mail = await transporter.sendMail(mailOptions);

		if (!mail) {
			return console.log('There is an error.');
		}

		res.status(200).json({
			status: 'success',
			message: 'Message sent to mail.',
		});
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};

const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password, confirmPassword } = req.body;
	try {
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

		const user = await Account.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			throw {
				code: 400,
				errorMessage: 'Token is invalid or has expired.',
				for: 'user',
				message: 'Custom error',
			};
		}

		if (password !== confirmPassword) {
			throw {
				code: 400,
				errorMessage: 'Passwords do not match.',
				for: 'password',
				message: 'Custom error',
			};
		}

		if (password && bcrypt.compareSync(password, user.password)) {
			throw {
				code: 400,
				errorMessage: "New password can't be same as the old password.",
				for: 'password',
				message: 'Custom error',
			};
		}

		if (password && !validator.isStrongPassword(password)) {
			throw {
				code: 400,
				errorMessage: 'Password not strong enough.',
				for: 'password',
				message: 'Custom error',
			};
		}

		let payload = {};
		if (password) {
			const salt = await bcrypt.genSalt();
			let hashed = await bcrypt.hash(password, salt);
			payload = {
				password: hashed,
				passwordResetToken: '',
				passwordResetExpires: '',
			};
		}

		const upA = await Account.updateOne(
			{
				_id: user._id,
			},
			payload
		);
		if (upA.acknowledged) {
			return res
				.status(200)
				.send({ message: 'Account updated successfully.', upA });
		}
		if (!upA.acknowledged) {
			return res
				.status(400)
				.send({ message: 'Something went wrong.Please try again.' });
		}
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};

const getAllAccounts = async (req, res) => {
	try {
		let allAccounts = await Account.find({ _id: { $ne: req.auth.id } }).select(
			'_id email fullName accountType accountImage'
		);
		return res.status(200).send(allAccounts);
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);

		return res.status(500).json({ errors });
	}
};

const getAccountType = async (req, res) => {
	try {
		return res.status(200).send({ accountType: req.auth.accountType });
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);

		return res.status(500).json({ errors });
	}
};

const getUserDetails = async (req, res) => {
	try {
		let userDetails = await Account.findOne({ _id: req.auth.id }).select(
			'_id email fullName accountImage'
		);
		return res.status(200).send(userDetails);
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);

		return res.status(500).json({ errors });
	}
};

const changeAccountType = async (req, res) => {
	try {
		const { id } = req.body;
		const account = await Account.findOne({ _id: id }).select('accountType');
		const upA = await Account.updateOne(
			{
				_id: id,
			},
			{ accountType: account.accountType === 'customer' ? 'admin' : 'customer' }
		);
		return res
			.status(200)
			.send({ message: 'Account updated successfully.', upA });
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);

		return res.status(500).json({ errors });
	}
};

const updateAccount = async (req, res) => {
	const { password, confirmPassword } = req.body;
	try {
		const acc = await Account.findOne({ _id: req.auth.id });
		if (password !== confirmPassword) {
			throw {
				code: 400,
				errorMessage: 'Passwords do not match.',
				for: 'password',
				message: 'Custom error',
			};
		}

		if (password && bcrypt.compareSync(password, acc.password)) {
			throw {
				code: 400,
				errorMessage: "New password can't be same as the old password.",
				for: 'password',
				message: 'Custom error',
			};
		}

		if (password && !validator.isStrongPassword(password)) {
			throw {
				code: 400,
				errorMessage: 'Password not strong enough.',
				for: 'password',
				message: 'Custom error',
			};
		}

		let payload = {
			...req.body,
		};
		if (password) {
			const salt = await bcrypt.genSalt();
			let hashed = await bcrypt.hash(password, salt);
			payload = {
				...req.body,
				password: hashed,
			};
		}

		let filteredOptions = Object.fromEntries(
			Object.entries(payload).filter(
				([k, v]) => v !== '' && v !== undefined && k !== 'confirmPassword'
			)
		);

		const upA = await Account.updateOne(
			{
				_id: req.auth.id,
			},
			filteredOptions
		);
		return res
			.status(200)
			.send({ message: 'Account updated successfully.', upA });
	} catch (error) {
		console.log(error);
		const errors = handleErrors(error);

		return res.status(500).json({ errors });
	}
};

const deleteAccount = async (req, res) => {
	try {
		const { id } = req.params;
		const rmE = await Account.deleteOne({ _id: id });
		if (!rmE.deletedCount) {
			throw {
				code: 400,
				errorMessage: 'User does not exist.',
				for: 'email',
				message: 'Custom error',
			};
		}

		return res.status(200).send({ message: 'User successfully deleted' });
	} catch (e) {
		console.log(e);
		res.status(500).send({ message: 'Internal Server Error!' });
	}
};

const validate = async (req, res) => {
	return res.status(200).send(req.auth);
};

module.exports = {
	signIn,
	login,
	forgotPassword,
	resetPassword,
	getAllAccounts,
	getAccountType,
	getUserDetails,
	changeAccountType,
	updateAccount,
	deleteAccount,
	validate,
};
