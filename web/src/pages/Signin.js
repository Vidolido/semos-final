import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';

const Signin = () => {
	// TODO: CSS, да проверам за додатни грешки.
	// тука може да направам објект за local state.

	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { signin, isLoading, error } = useSignin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signin(fullName, email, password, confirmPassword);
	};
	return (
		<div>
			<h1>Login</h1>
			{/* {error && (
				<div className='error'>
					{Object.entries(error).map((e, i) =>
						e[1] ? <span key={i}>{e[1]}</span> : ''
					)}
				</div>
			)} */}
			<form className='form' onSubmit={handleSubmit}>
				<div>
					<label>Full Name</label>
					<input
						type='text'
						onChange={(e) => setFullName(e.target.value)}
						value={fullName}
					/>
					{error && error['fullName'] && <span>{error['fullName']}</span>}
				</div>
				<div>
					<label>Email</label>
					<input
						type='text'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					{error && error['email'] && <span>{error['email']}</span>}
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					{error && error['password'] && <span>{error['password']}</span>}
				</div>
				<div>
					<label>Re-type Password</label>
					<input
						type='password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
					{error && error['password'].includes('do not match') && (
						<span>{error['password']}</span>
					)}
				</div>
				<div className='formBottom'>
					<Link to='/'>Forgot Password?</Link>
					<input type='submit' value='Log in' disabled={isLoading} />
				</div>
			</form>
		</div>
	);
};

export default Signin;
