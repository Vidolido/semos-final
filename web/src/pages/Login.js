import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
	// TODO: SCSS, да проверам за додатни грешки.
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoading, error } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};
	return (
		<div>
			<h1>Log In</h1>
			{error && (
				<div className='error'>
					{Object.entries(error).map((e, i) =>
						e[1] ? <span key={i}>{e[1]}</span> : ''
					)}
				</div>
			)}
			<form className='form' onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type='text'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<div className='formBottom'>
					<Link className='forgotPass' to='/'>
						Forgot Password?
					</Link>
					<input
						className='login'
						type='submit'
						value='Log in'
						disabled={isLoading}
					/>
				</div>
				<Link className='formLink' to='/signin'>
					Don't have an account?
				</Link>
			</form>
		</div>
	);
};

export default Login;
