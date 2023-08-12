import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';
import noImage from '../misc/no-event-image.jpg';
import UserNav from '../components/UserNav';

const UserDetails = () => {
	const { user, updateAccount } = useAuth();
	const [previewImage, setPreviewImage] = useState(null);
	const [isHidden, setIsHidden] = useState(true);

	const initialState = {
		fullName: '',
		email: '',
		userImage: '',
		password: '',
		confirmPassword: '',
	};

	const [updateOptions, setUpdateOptions] = useState(initialState);

	const handleOnChange = (e) => {
		console.log(e.target);
		setUpdateOptions((updateOptions) => ({
			...updateOptions,
			[e.target.name]: e.target.value,
		}));

		// if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleUpload = async (e) => {
		setPreviewImage(e.target.files[0]);
		setUpdateOptions((updateOptions) => ({
			...updateOptions,
			userImage: e.target.files[0],
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		updateAccount(updateOptions);
		// console.log(e);
	};
	let decoded = jwt_decode(user.token);
	// console.log(decoded);
	// console.log(updateOptions);
	return (
		<div className='userDetails'>
			<UserNav title='User Details' />

			<form className='form width-35per mt-20' onSubmit={handleSubmit}>
				<div className='userDetails gap-30'>
					<div className='avatar'>
						{/* TODO: Да направам иста шема за формите */}

						<div className='userInputs'>
							<div className='inputContainer'>
								<div className='imageContainer'>
									{previewImage ? (
										<img src={URL.createObjectURL(previewImage)} alt='Avatar' />
									) : (
										<img src={noImage} alt='User Avatar' />
									)}
								</div>
							</div>
							<div className='inputContainer'>
								<label className='imageLabel'>Upload Avatar</label>
								<input
									className='uploadButton'
									type='file'
									name='userImage'
									onChange={handleUpload}
								/>
								<input
									type='text'
									className='maskButton'
									value='Upload Avatar'
									placeholder='Upload Avatar'
									readOnly
								/>
							</div>
						</div>
					</div>
					<div className='info'>
						<div className='fullName'>
							<label>Full Name</label>
							<input type='text' name='fullName' onChange={handleOnChange} />
						</div>
						<div className='email'>
							<label>Email</label>
							<input
								type='email'
								name='email'
								onChange={handleOnChange}
								placeholder={decoded.email}
							/>
						</div>
					</div>
				</div>
				<div className='userSubmit'>
					<input type='submit' value='Submit' />
				</div>
			</form>
			<div className='changePassword'>
				<div className='top flex space-between width-35per'>
					<h3 className='ml-35'>Password</h3>
					<button
						className='btn-purpleToWhite'
						onClick={() => setIsHidden(!isHidden)}>
						Change Password
					</button>
				</div>
				{isHidden ? (
					''
				) : (
					<div className='bottom'>
						<form className='form width-35per' onSubmit={handleSubmit}>
							<div className=' inputContainer flex gap-20'>
								<div>
									<label>Password</label>
									<input
										type='password'
										name='password'
										onChange={handleOnChange}
									/>
								</div>
								<div>
									<label>Re-type Password</label>
									<input
										type='password'
										name='confirmPassword'
										onChange={handleOnChange}
									/>
								</div>
							</div>
							<div className='userSubmit'>
								<input type='submit' value='Submit' />
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserDetails;
