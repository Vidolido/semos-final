import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventsContext } from '../../hooks/useEventsContext';
import noImage from './no-event-image.jpg';

import {
	// SET_EVENTS_BY_CATEGORY,
	SET_COMEDY_EVENTS,
	SET_MUSIC_EVENTS,
} from '../../misc/actionTypes';

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
		<div>
			<h1>{cat}</h1>
			{console.log(noImage)}
			{category &&
				category[cat] &&
				category[cat].map((event) => {
					return (
						<div key={event._id}>
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
							<h3>{event.eventName}</h3>
							<span>{event.category}</span>
							<Link to={`/events/about/${event._id}`}>Get Tickets</Link>
						</div>
					);
				})}
		</div>
	);
};

export default Events;
