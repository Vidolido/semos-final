import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEventsContext } from '../hooks/useEventsContext';

import { SET_SINGLE_EVENT, CLEAR_STATE } from '../misc/actionTypes';
const About = () => {
	const { id } = useParams();
	const { event, dispatch } = useEventsContext();

	useEffect(() => {
		dispatch({ type: CLEAR_STATE });

		const getEvents = async () => {
			const res = await fetch(`/api/v1/events/single-event`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: id }),
			});
			const jsonRes = await res.json();

			if (res.ok) dispatch({ type: SET_SINGLE_EVENT, payload: jsonRes });
		};
		getEvents();
	}, [id, dispatch]);

	return (
		<div>
			About {id}
			{event && (
				<div>
					<h2>{event.eventName}</h2>
					<span>{event.eventDate}</span>
					<br />
					<span>{event.category}</span>
					<br />
					<div>
						<p>{event.detalis}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default About;
