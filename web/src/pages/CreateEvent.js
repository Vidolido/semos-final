import { useState, useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useStorage } from '../hooks/useStorage';
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
		imageName: '',
		tickets: 0,
		ticketPrice: 0,
		adminId: '',
		relatedEvents: [],
	};
	const [createEventOptions, setCreateEventOptions] = useState(initialState);
	const [previewImage, setPreviewImage] = useState(null);
	const [related, setRelated] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const {
		createEvent,
		getRelatedEvents,
		isLoading: eventIsLoading,
		error: eventError,
	} = useEvents();

	const {
		uploadFile,
		isLoading: fileIsLoading,
		error: fileError,
	} = useStorage();

	const handleOnChange = (e) => {
		console.log(e.target.name);
		if (e.target.files) setPreviewImage(URL.createObjectURL(e.target.files[0]));

		if (e.target.name === 'relatedEvents') {
			setSelectedEvent(e.target.value);
			return;
		}

		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		console.log(eventError, 'EVENT ERROR');
		console.log(fileError, 'FILE ERROR');

		if (!eventError && !fileError) {
			let imageName = !e.target.elements.eventImage.files
				? null
				: await uploadFile(e.target.elements.eventImage.files[0]);
			console.log(imageName);
			// e.target.elements.eventImage.files &&
			// 	uploadFile(e.target.elements.eventImage.files[0]);

			setCreateEventOptions((createEventOptions) => ({
				...createEventOptions,
				imageName,
			}));
			console.log(createEventOptions.imageName);
			createEvent(createEventOptions);
			// setCreateEventOptions(initialState);
		}
		// if (!eventError && !fileError) {
		// 	createEvent(createEventOptions);
		// 	setCreateEventOptions(initialState);

		// 	console.log(createEventOptions);
		// }
		//TODO: Да вратам порака за успешно креиран event
		// можеби во модал и онака ќе го правам
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		let relatedEvents = createEventOptions.relatedEvents;
		relatedEvents.push(selectedEvent);
		setCreateEventOptions((createEventOptions) => ({
			...createEventOptions,
			relatedEvents: [...relatedEvents],
		}));

		let getRelated = await getRelatedEvents(relatedEvents);
		setRelated(getRelated);
	};
	return (
		<div className='createEvent'>
			{console.log(createEventOptions)}
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
								disabled={eventIsLoading}
							/>
							{eventError && eventError['eventName'] && (
								<span className='error'>{eventError['eventName']}</span>
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
							{eventError && eventError['category'] && (
								<span className='error'>{eventError['category']}</span>
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
							{eventError && eventError['eventDate'] && (
								<span className='error'>{eventError['eventDate']}</span>
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
							{eventError && eventError['location'] && (
								<span className='error'>{eventError['location']}</span>
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
							{eventError && eventError['tickets'] && (
								<span className='error'>{eventError['tickets']}</span>
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
							{eventError && eventError['details'] && (
								<span className='error'>{eventError['details']}</span>
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
									isLoading={eventIsLoading}
								/>
							</div>
						)}
					</div>
					<div className='container'>
						{related &&
							related.map((event) => (
								<div key={event._id} className='related'>
									<p>{event.eventName}</p>
									<p>{event.eventDate}</p>
									<p>{event.location}</p>
								</div>
							))}
					</div>

					<button
						type='submit'
						className='btn-blackToTransparent'
						value='Save'
						disabled={eventIsLoading}>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
