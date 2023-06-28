// 3rd party
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// moddels
const Account = require('../../../pkg/account');

// config and custom
const config = require('../../../pkg/config');

const handleErrors = (err) => {
	let errors = {
		email: '',
		password: '',
		fullName: '',
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
		//TODO: да проверам што ќе се случи во случај на повеќе custom errors -- проверив, не ги фаќа.
	}

	return errors;
};

const signIn = async (req, res) => {
	const { fullName, email, password, confirmPassword } = req.body;
	let collectionLength = await Account.count();
	try {
		if (password !== confirmPassword) {
			console.log(password, confirmPassword);
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
			accountType: collectionLength > 0 ? 'customer' : 'admin',
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
		console.log(err);
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body; // tuka napraviv promena ^
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
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

const getAllAccounts = async (req, res) => {
	try {
		let allAccounts = await Account.find({});
		return res.status(200).send(allAccounts);
	} catch (err) {
		console.log(err);
		const errors = handleErrors(err);

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
	// TODO: да проверам за грешки.
	console.log(req.auth);
	return res.status(200).send(req.auth); // return the token payload
};

module.exports = {
	signIn,
	login,
	getAllAccounts,
	deleteAccount,
	validate,
};
