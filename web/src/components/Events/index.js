import { useEffect, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { useEventsContext } from '../../hooks/useEventsContext';
// import noImage from './no-event-image.jpg';

import {
	// SET_EVENTS_BY_CATEGORY,
	SET_COMEDY_EVENTS,
	SET_MUSIC_EVENTS,
} from '../../misc/actionTypes';

// components
import EventCard from '../EventCard';

const Events = ({ cat }) => {
	const { category, dispatch } = useEventsContext();

	let actionType = cat === 'comedy' ? SET_COMEDY_EVENTS : SET_MUSIC_EVENTS;

	useEffect(() => {
		const getEvents = async () => {
			const res = await fetch(`/api/v1/events/${cat}`);
			const jsonRes = await res.json();
			if (res.ok) {
				dispatch({ type: actionType, payload: jsonRes });
			}
		};
		getEvents();
	}, [cat, actionType, dispatch]);

	return (
		<Fragment>
			<h1>{cat === 'comedy' ? 'Stand-up Comedy' : 'Musical Concerts'}</h1>
			<div className='eventsContainer'>
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
