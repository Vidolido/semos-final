import { useState } from 'react';
import { Link } from 'react-router-dom';

import validator from 'validator';

import { useAuth } from '../hooks/useAuth';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState(null);
	const { forgotPassword } = useAuth();

	const hanldeOnChange = (e) => {
		setEmail(e.target.value);
		setMessage(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validator.isEmail(email) &&
			forgotPassword(email).then((res) => {
				setMessage(res);
				setEmail('');
			});
	};
	return (
		<div>
			<h1>Forgot Password</h1>
			<form className='form' onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type='text'
					name='email'
					onChange={hanldeOnChange}
					value={email}
				/>
				<input
					className='login'
					type='submit'
					value='Send password reset email'
				/>
				<Link to='/login'>Back to login</Link>
			</form>
			{message && console.log(message)}
			{message && <span>{message.message}</span>}
		</div>
	);
};

export default ForgotPassword;
