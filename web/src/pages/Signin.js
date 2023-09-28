import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Signin = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const { signIn, isLoading, error } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signIn(fullName, email, password, confirmPassword);
	};
	return (
		<div>
			<h1 className='heading'>Create account</h1>
			<form className='form' onSubmit={handleSubmit}>
				<div>
					<label>Full Name</label>
					<input
						type='text'
						onChange={(e) => setFullName(e.target.value)}
						value={fullName}
					/>
					{error && error['fullName'] && (
						<span className='error'>{error['fullName']}</span>
					)}
				</div>
				<div>
					<label>Email</label>
					<input
						type='text'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					{error && error['email'] && (
						<span className='error'>{error['email']}</span>
					)}
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					{error && error['password'] && (
						<span className='error'>{error['password']}</span>
					)}
				</div>
				<div>
					<label>Re-type Password</label>
					<input
						type='password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
					{error && error['password'].includes('do not match') && (
						<span className='error'>{error['password']}</span>
					)}
				</div>
				<div className='formBottom'>
					<input type='submit' value='Create Account' disabled={isLoading} />
				</div>
				<Link to='/login'>Already have an account?</Link>
			</form>
		</div>
	);
};

export default Signin;
