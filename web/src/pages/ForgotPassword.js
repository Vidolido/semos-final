import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const { forgotPassword } = useAuth();

	const hanldeOnChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		forgotPassword(email);
	};
	// console.log(email)
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
		</div>
	);
};

export default ForgotPassword;
