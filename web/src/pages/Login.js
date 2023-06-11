import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div>
			<h1>Login</h1>
			<form>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' name='email' />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' />
				</div>
				<div className='formBottom'>
					<Link to='/'>Forgot Password?</Link>
					<input type='submit' value='Log in' />
				</div>
			</form>
		</div>
	);
};

export default Login;
