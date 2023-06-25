// import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const EventCard = ({ event }) => {
	let date = new Date(event.eventDate);
	return (
		<div className='eventCard'>
			<div className='eventImageContainer'>
				{!event.imageUrl ? (
					<img className='eventImage' src={noImage} alt='Tickets for events' />
				) : (
					<img
						className='eventImage'
						src={event.imageUrl}
						alt='Tickets for events'
					/>
				)}
			</div>
			<div className='eventInfo'>
				<h3>{event.eventName}</h3>

				<span className='block purpleText boldText mediumText'>{`${
					months[date.getMonth()]
				} ${date.getDate()}${
					dates[date.getDate()]
				}, ${date.getFullYear()}`}</span>

				<p className='cardExcerpt mediumText'>{event.details.substr(0, 120)}</p>

				<div className='cardBottom'>
					<span className='mediumText'>{event.location}</span>
					<Link className='btn-blackToPurple' to={`/events/about/${event._id}`}>
						Get Tickets
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
