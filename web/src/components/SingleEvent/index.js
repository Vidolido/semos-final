import { Fragment, useState } from 'react';
//hooks
import { useCart } from '../../hooks/useCart';
// misc
import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const SingleEvent = ({ event }) => {
	const [numberOfTickets, setNumberOfTickets] = useState(1);
	const { addToCart, isLoading, error } = useCart(); //  Да ги искористам овие
	let date = new Date(event.eventDate);

	const handleChange = (e) => {
		setNumberOfTickets(e.target.value);
	};
	const handleSubmit = (form, id) => {
		form.preventDefault();
		addToCart(numberOfTickets, event._id);
	};
	console.log(event);
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
					{/* {!event.eventImage ? (
						<img
							className='eventImage'
							src={noImage}
							alt='Tickets for events'
						/>
					) : (
						<img
							className='eventImage'
							src={event.eventImage}
							alt='Tickets for events'
						/>
					)} */}
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
			<div className='relatedEvents'>
				{event.relatedEvents.map((rE) => (
					<div>
						<p>{rE.eventName}</p>
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default SingleEvent;
