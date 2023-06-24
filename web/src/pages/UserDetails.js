import UserNav from '../components/UserNav';

const UserDetails = () => {
	return (
		<div className='userDetails'>
			<UserNav title='User Details' />

			<form className='form'>
				<div className='avatar'>
					<div className='imgContainer'>
						<image src='' alt='Avatar image' />
					</div>
					<input type='file' name='avatarImg' className='uploadButton' />
					{/* Да го направам ова инпут поле скриено и да направам копче со стил под него за да пишува Upload Avatar */}
					{/* Да ставам слика за default avatar */}
				</div>
				<div className='info'>
					<div className='fullName'>
						<label>Full Name</label>
						<input type='fullName' />
					</div>
					<div className='email'>
						<label>Email</label>
						<input type='email' />
					</div>
				</div>
				<input type='submit' value='Submit' />
			</form>
			<div className='changePassword'>
				<div className='top'>
					<h3>Change Password</h3>
					<button>Change Password</button>
				</div>
				<div className='bottom'>
					<form>
						<div>
							<label>Password</label>
							<input type='password' />
						</div>
						<div>
							<label>Re-type Password</label>
							<input type='password' />
						</div>
						<input type='submit' value='Submit' />
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
