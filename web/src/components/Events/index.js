import { useEffect } from 'react';
import { useEventsContext } from '../../hooks/useEventsContext';

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

	const handleClick = (id) => {
		console.log(id);
	};
	return (
		<div>
			<h1>{cat}</h1>
			{category &&
				category[cat].map((event) => {
					return (
						<div key={event._id}>
							<h3>{event.eventName}</h3>
							<span>{event.category}</span>
							<button
								onClick={() => {
									handleClick(event._id);
								}}>
								Get Tickets
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Events;
