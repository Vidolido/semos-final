import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
const ResetPassword = () => {
	const [state, setState] = useState({
		password: '',
		confirmPassword: '',
	});
	const { resetPassword } = useAuth();
	const { token } = useParams();

	const hanldeOnChange = (e) => {
		setState((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		resetPassword(token, state.password, state.confirmPassword);
		<Navigate to='/login' />;
	};
	return (
		<div>
			<h1>Reset Password</h1>
			<form className='form' onSubmit={handleSubmit}>
				<label>Password</label>
				<input type='text' name='password' onChange={hanldeOnChange} />
				<label>Re-type password</label>
				<input type='text' name='confirmPassword' onChange={hanldeOnChange} />

				<input className='login' type='submit' value='Reset Password' />
				<Link to='/login'>Back to login</Link>
			</form>
		</div>
	);
};

export default ResetPassword;
