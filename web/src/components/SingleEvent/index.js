import { Fragment } from 'react';

import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const SingleEvent = ({ event }) => {
	let date = new Date(event.eventDate);

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	// console.log(event);
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
					{!event.imageUrl ? (
						<img
							className='eventImage'
							src={noImage}
							alt='Tickets for events'
						/>
					) : (
						<img
							className='eventImage'
							src={event.imageUrl}
							alt='Tickets for events'
						/>
					)}
				</div>
				<div className='detailsContainer'>
					<h2 className='mb-15'>About</h2>
					<p className='mediumText'>{event.detalis}</p>
					<div className='tickets'>
						<div className='price mt-20'>
							{/* Можеби треба да направам посебна логика за ова */}
							<p>Tickets: ${parseFloat(event.ticketPrice).toFixed(2)} USD</p>
							<div className='addTickets  mt-10'>
								<form
									className='flex half-width align-center gap-20'
									onSubmit={handleSubmit}>
									<input className='inputField' type='number' min={1} />
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
		</Fragment>
	);
};

export default SingleEvent;
