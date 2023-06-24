import { Link } from 'react-router-dom';

import noImage from './no-event-image.jpg';

const EventCard = ({ event }) => {
	// console.log(event);
	return (
		<div>
			{!event.imageUrl ? (
				<img className='eventImage' src={noImage} alt='Tickets for events' />
			) : (
				<img
					className='eventImage'
					src={event.imageUrl}
					alt='Tickets for events'
				/>
			)}
			<h3>{event.eventName}</h3>
			<span>{event.category}</span>
			<Link to={`/events/about/${event._id}`}>Get Tickets</Link>
		</div>
	);
};

export default EventCard;
