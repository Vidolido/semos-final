import { useState, Fragment } from 'react';
import { useCreateEvent } from '../hooks/useCreateEvent';
// import { useAuthContext } from '../hooks/useAuthContext';

import UserNav from '../components/UserNav';
import RelatedEvents from '../components/RelatedEvents';
import noImage from '../misc/no-event-image.jpg';

//TODO: ticketPrice да го направам да прима децимали
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
		// console.log(e.target);
		if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));

		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			[e.target.name]: e.target.value,
		}));
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		createEvent(createEventOptions);
		// console.log(error, 'ovoj');
		!error && setCreateEventOptions(initialState);
	};
	return (
		<div className='createEvent'>
			<UserNav title='Create Events' />
			<div className='container'>
				<form className='form full-width' onSubmit={handleFormSubmit}>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Event Name</label>
							<input
								type='text'
								value={createEventOptions.eventName}
								name='eventName'
								onChange={handleOnChange}
							/>
							{error && error['eventName'] && (
								<span className='error'>{error['eventName']}</span>
							)}
						</div>
						<div className='inputContainer'>
							<label>Category</label>
							<select
								name='category'
								defaultValue='Choose Event Category'
								onChange={handleOnChange}>
								<option defaultValue='Choose Event Category' disabled hidden>
									Choose Event Category
								</option>
								<option value='comedy'>Stand-up Comedy</option>
								<option value='music'>Musical Concert</option>
							</select>
							{/* TODO: Да најдам начин да го испечатам еророт */}
							{error && error['category'] && (
								<span className='error'>{error['category']}</span>
							)}
						</div>
						<div className='inputContainer'>
							<label>Date</label>
							<input
								type='date'
								value={createEventOptions.eventDate}
								name='eventDate'
								onChange={handleOnChange}
							/>
							{error && error['eventDate'] && (
								<span className='error'>{error['eventDate']}</span>
							)}
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
								readOnly
							/>
						</div>
						<div className='inputContainer'>
							<label>Location</label>
							<input
								type='text'
								value={createEventOptions.location}
								name='location'
								onChange={handleOnChange}
							/>
							{error && error['location'] && (
								<span className='error'>{error['location']}</span>
							)}
						</div>
						<div className='inputContainer'>
							<label>Ticket Price</label>
							<input
								type='number'
								value={createEventOptions.ticketPrice}
								name='ticketPrice'
								onChange={handleOnChange}
							/>
							{error && error['tickets'] && (
								<span className='error'>{error['tickets']}</span>
							)}
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
								value={createEventOptions.details}
								name='details'
								onChange={handleOnChange}
							/>
							{error && error['details'] && (
								<span className='error'>{error['details']}</span>
							)}
						</div>
					</div>
					<div className='container'>
						{/* Ова треба да има посебна логика */}
						{!createEventOptions.category && <h1>Please select a category</h1>}
						{createEventOptions.category && (
							<div className='eventInputs'>
								<RelatedEvents cat={createEventOptions.category} />
							</div>
						)}
					</div>

					<button type='submit' className='btn-blackToTransparent' value='Save'>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
