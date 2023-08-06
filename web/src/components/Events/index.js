import { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';

// components
import EventCard from '../EventCard';

const Events = ({ cat }) => {
	const { getEventsByCategory, category, error } = useEvents();

	useEffect(() => {
		getEventsByCategory(cat);
	}, [cat]);

	return (
		<Fragment>
			<h1>{cat === 'comedy' ? 'Stand-up Comedy' : 'Musical Concerts'}</h1>
			{category &&
				category[cat] &&
				category[cat].map((event) => {
					return (
						<div key={event._id} className='categoryEvents eventGrid'>
							<EventCard event={event} showDiscription={true} />
							<div className='buttons buttonItems item5'>
								<Link
									className='btn-blackToPurple'
									to={`/events/about/${event._id}`}>
									Get Tickets
								</Link>
							</div>
						</div>
					);
				})}
		</Fragment>
	);
};

export default Events;
