import { Fragment, useState, useEffect } from 'react';
// hooks
import { useCart } from '../../hooks/useCart';
import { useStorage } from '../../hooks/useStorage';

// misc
import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

// components
import EventCard from '../EventCard';

const SingleEvent = ({ event }) => {
	const { downloadFile } = useStorage();
	const [image, setImage] = useState(null);
	const [numberOfTickets, setNumberOfTickets] = useState(1);
	const { addToCart } = useCart();
	let date = new Date(event.eventDate);

	useEffect(() => {
		downloadFile(event.eventImage).then((res) => setImage(res));
	}, [event, downloadFile]);

	const handleChange = (e) => {
		setNumberOfTickets(e.target.value);
	};
	const handleSubmit = (form) => {
		form.preventDefault();
		addToCart(numberOfTickets, event._id);
	};
	return (
		<Fragment>
			<div className='mainInfo'>
				<h1>{event.eventName}</h1>
				<h3 className='block boldText'>{`${
					months[date.getMonth()]
				} ${date.getDate()}${
					dates[date.getDate()]
				}, ${date.getFullYear()}`}</h3>
				<h3>{event.location}</h3>
			</div>
			<br />

			<div className='eventDetails'>
				<div className='imageContainer'>
					{!image ? (
						<img
							className='eventImage'
							src={noImage}
							alt='Tickets for events'
						/>
					) : (
						<img className='eventImage' src={image} alt='Tickets for events' />
					)}
					<img className='eventImage' src={noImage} alt='Tickets for events' />
				</div>
				<div className='detailsContainer'>
					<h2 className='mb-15'>About</h2>
					<p className='mediumText'>{event.details}</p>
					<div className='tickets'>
						<div className='price mt-20'>
							{/* Можеби треба да направам посебна логика за ова */}
							<h3>
								Tickets:{' '}
								<b className='purpleText'>
									${parseFloat(event.ticketPrice).toFixed(2)} USD
								</b>
							</h3>
							<div className='addTickets  mt-10'>
								<form
									className='flex half-width align-center gap-20'
									onSubmit={handleSubmit}>
									<input
										className='inputField'
										value={numberOfTickets}
										name='numberOfTickets'
										type='number'
										onChange={handleChange}
										min={1}
									/>
									<input
										className='btn-blackToTransparent'
										type='submit'
										value='Add to cart'
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='relatedEvents mt-50'>
				<h2>Related Events</h2>
				<div className='flex gap-20'>
					{event.relatedEvents.map((rE) => (
						<EventCard event={rE} />
					))}
				</div>
				{/* {event.relatedEvents.map((rE) => (
					<div>
						<p>{rE.eventName}</p>
					</div>
				))} */}
			</div>
		</Fragment>
	);
};

export default SingleEvent;
