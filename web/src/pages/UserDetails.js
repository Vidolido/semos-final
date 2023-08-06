import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
import noImage from '../misc/no-event-image.jpg';
import UserNav from '../components/UserNav';

const UserDetails = () => {
	const { user } = useAuthContext();
	const [previewImage, setPreviewImage] = useState(null);
	const [isHidden, setIsHidden] = useState(true);
	const handleOnChange = (e) => {
		// console.log('Clicked!');
		if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));
	};
	let decoded = jwt_decode(user.token);
	console.log(decoded);
	return (
		<div className='userDetails'>
			<UserNav title='User Details' />

			<form className='form width-35per mt-20'>
				<div className='userDetails gap-30'>
					<div className='avatar'>
						{/* TODO: Да направам иста шема за формите */}

						<div className='userInputs'>
							<div className='inputContainer'>
								<div className='imageContainer'>
									{previewImage ? (
										<img src={previewImage} alt='Avatar' />
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
									name='eventImage'
									onChange={handleOnChange}
								/>
								<input
									type='text'
									className='maskButton'
									value='Upload Avatar'
									placeholder='Upload Avatar'
								/>
							</div>
						</div>
					</div>
					<div className='info'>
						<div className='fullName'>
							<label>Full Name</label>
							<input type='fullName' />
						</div>
						<div className='email'>
							<label>Email</label>
							<input type='email' placeholder={decoded.email} />
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
						<form className='form width-35per'>
							<div className=' inputContainer flex gap-20'>
								<div>
									<label>Password</label>
									<input type='password' />
								</div>
								<div>
									<label>Re-type Password</label>
									<input type='password' />
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
