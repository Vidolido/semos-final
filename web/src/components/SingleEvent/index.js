import { Fragment } from 'react';
//hooks
import { useCart } from '../../hooks/useCart';
// misc
import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const SingleEvent = ({ event }) => {
	let date = new Date(event.eventDate);
	const { addToCart, isLoading, error } = useCart(); //  Да ги искористам овие

	const handleSubmit = (form, id) => {
		form.preventDefault();
		addToCart(form, id);
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
					{!event.eventImage ? (
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
					)}
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
									onSubmit={(e) => handleSubmit(e, event._id)}>
									<input
										className='inputField'
										defaultValue='1'
										name='numberOfTickets'
										type='number'
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
				<div className='relatedEvents'>
					{event.relatedEvents &&
						event.relatedEvents.map((rE) => (
							<div>
								<p>{rE.eventName}</p>
							</div>
						))}
				</div>
			</div>
		</Fragment>
	);
};

export default SingleEvent;
