import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
// import { useAuth } from '../hooks/useAuth';

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
		relatedEvents: [],
	};
	const [createEventOptions, setCreateEventOptions] = useState(initialState);
	const [previewImage, setPreviewImage] = useState(null);
	// const [relatedEvents, setRelatedEvents] = useState([]);
	const { createEvent, isLoading, error } = useEvents();
	// const { user } = useAuth();

	const handleOnChange = (e) => {
		// console.log(user); // Навидум работи
		// if (e.target.name === 'relatedEvents') return;
		// console.log(e.target.name === 'relatedEvents', 'OVOA E RELATED');
		if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));

		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			[e.target.name]: e.target.value,
		}));
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		createEvent(createEventOptions);

		// if (!error) {
		setCreateEventOptions(initialState);
		console.log(e.target);
		e.target.reset();
		// }

		//TODO: Да вратам порака за успешно креиран event
	};

	const handleAdd = (e) => {
		e.preventDefault();
		let relatedEvents = createEventOptions.relatedEvents;
		let selectedEvent = e.target.form.elements.relatedEvents.value;

		if (!relatedEvents.length) {
			relatedEvents.push(selectedEvent);
		} else if (relatedEvents.length < 2) {
			relatedEvents.unshift(selectedEvent);
		} else if (relatedEvents.length === 2) {
			relatedEvents.pop();
			relatedEvents.unshift(selectedEvent);
		}
		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			...relatedEvents,
		}));
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
								disabled={isLoading}
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
								<option
									defaultValue='Choose Event Category'
									disabled
									hidden
									selected={!createEventOptions.category ? true : false}>
									Choose Event Category
								</option>
								<option value='comedy'>Stand-up Comedy</option>
								<option value='music'>Musical Concert</option>
							</select>
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
						{!createEventOptions.category && <h1>Please select a category</h1>}
						{createEventOptions.category && (
							<div className='eventInputs'>
								<RelatedEvents
									cat={createEventOptions.category}
									handleOnChange={handleOnChange}
									handleAdd={handleAdd}
									isLoading={isLoading}
								/>
							</div>
						)}
					</div>

					<button
						type='submit'
						className='btn-blackToTransparent'
						value='Save'
						disabled={isLoading}>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
