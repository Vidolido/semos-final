import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useStorage } from '../hooks/useStorage';

import UserNav from '../components/UserNav';
import RelatedEvents from '../components/RelatedEvents';
import EventCard from '../components/EventCard';
import noImage from '../misc/no-event-image.jpg';

const UpdateEvent = () => {
	const initialState = {
		eventName: '',
		category: '',
		eventDate: '',
		location: '',
		details: '',
		eventImage: '',
		ticketPrice: 0,
		relatedEvents: [],
	};
	const { id } = useParams();
	const [updateEventOptions, setUpdateEventOptions] = useState(initialState);
	const [previewImage, setPreviewImage] = useState('');
	const [related, setRelated] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [date, setDate] = useState();

	const {
		updateEvent,
		getSingleEvent,
		getRelatedEvents,
		event,
		isLoading: eventIsLoading,
		error: eventError,
	} = useEvents();

	const { downloadFile } = useStorage();

	useEffect(() => {
		getSingleEvent(id);
	}, [id]);

	useEffect(() => {
		if (event && event.relatedEvents) {
			setUpdateEventOptions((updateEventOptions) => ({
				...updateEventOptions,
				...event,
				relatedEvents: [...event.relatedEvents],
			}));

			getRelatedEvents(event.relatedEvents).then((relatedEvents) =>
				setRelated(relatedEvents)
			);
		}
	}, [event]);

	useEffect(() => {
		event && event.eventDate && setDate(new Date(event.eventDate));
	}, [event]);

	useEffect(() => {
		event &&
			event.eventImage &&
			downloadFile(event.eventImage).then((file) => {
				const fileName = file.split('/').reverse()[0];
				setPreviewImage(file);
				setUpdateEventOptions((updateEventOptions) => ({
					...updateEventOptions,
					eventImage: fileName,
				}));
			});
	}, [event]);

	const handleOnChange = (e) => {
		console.log(e.target.name, e.target.value);
		if (e.target.name === 'eventDate') {
			console.log(e.target.name, e.target.value);
			let date = new Date(e.target.value);
			setDate(date);

			return;
		}
		if (e.target.name === 'relatedEvents') {
			setSelectedEvent(e.target.value);
			return;
		}

		setUpdateEventOptions((updateEventOptions) => ({
			...updateEventOptions,
			[e.target.name]: e.target.value,
		}));
	};
	const handleUpload = async (e) => {
		setPreviewImage(e.target.files[0]);
		setUpdateEventOptions((updateEventOptions) => ({
			...updateEventOptions,
			eventImage: e.target.files[0],
		}));
	};
	const handleAdd = async (e) => {
		e.preventDefault();

		let relatedEvents = updateEventOptions.relatedEvents;
		relatedEvents.push(selectedEvent);

		setUpdateEventOptions((updateEventOptions) => ({
			...updateEventOptions,
			...relatedEvents,
		}));

		let getRelated = await getRelatedEvents(relatedEvents);
		setRelated(getRelated);
	};

	const hanldeRemove = async (e, id) => {
		e.preventDefault();

		let removed = related.filter((event) => event._id !== id);
		setUpdateEventOptions((updateEventOptions) => ({
			...updateEventOptions,
			relatedEvents: [...removed],
		}));
		setRelated(removed);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let updated = await updateEvent(updateEventOptions, id);

		if (updated) {
			console.log(updated);
		}
	};
	return (
		<div className='createEvent'>
			<UserNav title='Edit Event' />
			<div className='container'>
				<form className='form full-width' onSubmit={handleFormSubmit}>
					<div className='eventInputs'>
						<div className='inputContainer'>
							<label>Event Name</label>
							<input
								type='text'
								value={updateEventOptions.eventName}
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
								onChange={handleOnChange}
								value={updateEventOptions.category}>
								<option
									defaultValue='Choose Event Category'
									disabled
									hidden
									value='empty'>
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
								value={
									date &&
									`${date.getFullYear()}-${('0' + date.getMonth()).slice(
										-2
									)}-${('0' + date.getDay()).slice(-2)}`
								}
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
								onChange={handleUpload}
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
								value={updateEventOptions.location}
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
								value={updateEventOptions.ticketPrice}
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
									<Fragment>
										{previewImage instanceof File ? (
											<img
												src={URL.createObjectURL(previewImage)}
												alt='Art about the event'
											/>
										) : (
											<img src={previewImage} alt='Art about the event' />
										)}
									</Fragment>
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
								value={updateEventOptions.details}
								name='details'
								onChange={handleOnChange}
							/>
							{eventError && eventError['details'] && (
								<span className='error'>{eventError['details']}</span>
							)}
						</div>
					</div>
					<div className='container'>
						{updateEventOptions.category === 'empty' && (
							<h1>Please select a category</h1>
						)}
						{updateEventOptions.category !== 'empty' && (
							<div className='eventInputs'>
								<RelatedEvents
									cat={updateEventOptions.category}
									handleOnChange={handleOnChange}
									handleAdd={handleAdd}
									isLoading={eventIsLoading}
									eventId={id}
								/>
							</div>
						)}
					</div>
					<div className='threeColumGrid'>
						{related &&
							related.map((event) => (
								<div key={event._id} className='relatedEventsGrid'>
									<EventCard event={event} groupItems={true} />
									<div className='button buttonItems item5'>
										<button
											onClick={(e) => hanldeRemove(e, event._id)}
											className='btn-blackToPurple'>
											Remove
										</button>
									</div>
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

export default UpdateEvent;
