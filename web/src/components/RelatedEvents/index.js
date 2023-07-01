import { useEffect, Fragment } from 'react';
import { useEventsContext } from '../../hooks/useEventsContext';

import { SET_COMEDY_EVENTS, SET_MUSIC_EVENTS } from '../../misc/actionTypes';
import { months, dates } from '../../misc/dateTime';

const RelatedEvents = ({ cat }) => {
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
			<div className='inputContainer'>
				<label>Related events</label>
				<select name='event' defaultValue='Choose Event'>
					<option defaultValue='Choose Event' disabled hidden>
						Choose Event
					</option>
					{category[cat] &&
						category[cat].map((event) => {
							let date = new Date(event.eventDate);

							return (
								<option value={cat}>{`${event.eventName} - ${
									months[date.getMonth()]
								} ${date.getDate()}${
									dates[date.getDate()]
								}, ${date.getFullYear()} - ${event.location} `}</option>
							);
						})}
				</select>
			</div>
			<div className='inputContainer'>
				<label>Event Details</label>
				<button className='btn-blackToTransparent'>Add</button>
			</div>
		</Fragment>
	);
};

export default RelatedEvents;
