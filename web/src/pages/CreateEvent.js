import { useState } from 'react';
import { useCreateEvent } from '../hooks/useCreateEvent';
// import { useAuthContext } from '../hooks/useAuthContext';
import UserNav from '../components/UserNav';

import noImage from '../misc/no-event-image.jpg';

const CreateEvent = () => {
	const initialState = {
		eventName: '',
		category: '',
		eventDate: '',
		location: '',
		details: '',
		imageUrl: '',
		tickets: 0,
		ticketPrice: 0,
		adminId: '',
	};
	const [createEventOptions, setCreateEventOptions] = useState(initialState);
	const [previewImage, setPreviewImage] = useState(null);
	const { createEvent, isLoading, error } = useCreateEvent();
	// const { user } = useAuthContext();

	const handleOnChange = (e) => {
		console.log(e.target);
		// if (URL.createObjectURL(e.target.files[0]))
		if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));

		// let testImage = URL.createObjectURL(e.target.files[0]);
		// console.log(e.target.name, e.target.value, testImage);
		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			[e.target.name]: e.target.value,
		}));
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		createEvent(createEventOptions);
	};
	return (
		<div className='createEvent'>
			<UserNav title='Create Events' />
			<div className='container'>
				<form className='form full-width' onSubmit={handleFormSubmit}>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Event Name</label>
							<input type='text' name='eventName' onChange={handleOnChange} />
						</div>
						<div className='inputContainer'>
							<label>Category</label>
							<select
								name='category'
								defaultValue={'Choose Event Category'}
								onChange={handleOnChange}>
								<option
									value='Choose Event Category'
									defaultValue={'Choose Event Category'}
									disabled
									hidden>
									Choose Event Category
								</option>
								<option value='comedy'>Stand-up Comedy</option>
								<option value='music'>Musical Concert</option>
							</select>
						</div>
						<div className='inputContainer'>
							<label>Date</label>
							<input type='date' name='eventDate' onChange={handleOnChange} />
						</div>
					</div>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label className='imageLabel'>Upload Event Art</label>
							<input
								className='uploadButton'
								type='file'
								name='eventImage'
								onChange={handleOnChange}
							/>
							<input
								type='text'
								className='maskButton'
								value='Upload Event Art'
								placeholder='Upload Event Art'
							/>
						</div>
						<div className='inputContainer'>
							<label>Location</label>
							<input type='text' name='location' onChange={handleOnChange} />
						</div>
						<div className='inputContainer'>
							<label>Ticket Price</label>
							<input
								type='number'
								name='ticketPrice'
								onChange={handleOnChange}
							/>
						</div>
					</div>
					<div className='eventInputs'>
						<div className='inputContainer flex-shrink'>
							<label>Event Photo</label>
							<div className='imageContainer'>
								{previewImage ? (
									<img src={previewImage} alt='Art about the event' />
								) : (
									<img src={noImage} alt='Art about the event' />
								)}
							</div>
						</div>
						<div className='inputContainer flex-grow m-0'>
							<label>Event Details</label>
							<textarea
								className='mt-5'
								type='text'
								name='details'
								onChange={handleOnChange}
							/>
						</div>
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
					<input type='submit' value='Submit' />
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
