import UserNav from '../components/UserNav';

const CreateEvent = () => {
	return (
		<div>
			<UserNav title='Create Events' />
			<div className='container'>
				<form className='form full-width'>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Event Name</label>
							<input type='text' />
						</div>
						<div className='inputContainer'>
							<label>Category</label>
							<select name='category'>
								<option value='comedy'>Stand-up Comedy</option>
								<option value='music'>Musical Concert</option>
							</select>
						</div>
						<div className='inputContainer'>
							<label>Date</label>
							<input type='date' />
						</div>
					</div>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Upload Event Art</label>
							<input type='text' />
						</div>
						<div className='inputContainer'>
							<label>Location</label>
							<input type='text' />
						</div>
						<div className='inputContainer'>
							<label>Ticket Price</label>
							<input type='text' />
						</div>
					</div>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Event Photo</label>
							<input type='text' />
						</div>
						<div className='inputContainer'>
							<label>Event Details</label>
							<input type='text' />
						</div>
					</div>
				</form>
			</div>
			<div className='container'>
				<div className='eventInputs'>
					{/* Ова треба да има посебна логика */}
					<div className='inputContainer'>
						<label>Related events</label>
						<input type='text' />
					</div>
					<div className='inputContainer'>
						<label>Event Details</label>
						<input type='text' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateEvent;
