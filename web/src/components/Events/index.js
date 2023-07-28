import { useEffect, Fragment } from 'react';
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
			<div className='eventsContainer mb-50'>
				{category &&
					category[cat] &&
					category[cat].map((event) => {
						return <EventCard key={event._id} event={event} />;
					})}
			</div>
		</Fragment>
	);
};

export default Events;
