import { useEffect, Fragment } from 'react';
import { useEventsContext } from '../../hooks/useEventsContext';

import { SET_COMEDY_EVENTS, SET_MUSIC_EVENTS } from '../../misc/actionTypes';
import { months, dates } from '../../misc/dateTime';

// TODO: Оваа компонента и Events компонентата да ги спојам во една
const RelatedEvents = ({ cat, handleOnChange, handleAdd, isLoading }) => {
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
				<select
					name='relatedEvents'
					onChange={handleOnChange}
					defaultValue='Choose Event'>
					<option value='Choose Event' disabled hidden>
						Choose Event
					</option>
					{category &&
						category[cat] &&
						category[cat].map((event) => {
							let date = new Date(event.eventDate);

							return (
								<option key={event._id} value={event._id}>{`${
									event.eventName
								} - ${months[date.getMonth()]} ${date.getDate()}${
									dates[date.getDate()]
								}, ${date.getFullYear()} - ${event.location} `}</option>
							);
						})}
				</select>
			</div>
			<div className='inputContainer'>
				<label>Event Details</label>
				<button
					onClick={handleAdd}
					type='submit'
					className='btn-blackToTransparent'
					value='Add'
					disabled={isLoading}>
					Add
				</button>
			</div>
		</Fragment>
	);
};

export default RelatedEvents;
