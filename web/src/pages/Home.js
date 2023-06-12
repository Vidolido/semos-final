import { useEffect } from 'react';
import { useEventsContext } from '../hooks/useEventsContext';
// import { useAuthContext } from '../hooks/useAuthContext';

import { SET_EVENTS } from '../misc/actionTypes';

const Home = () => {
	const { events, dispatch } = useEventsContext();

	useEffect(() => {
		const getEvents = async () => {
			const res = await fetch('api/v1/events/');
			const jsonRes = await res.json();

			if (res.ok) {
				dispatch({ type: SET_EVENTS, payload: jsonRes });
			}
		};
		getEvents();
	}, [dispatch]);

	return (
		<div className='home'>
			<main>
				<div className='events'>
					{events &&
						events.map((event) => {
							return (
								<div key={event._id}>
									<h3>{event.eventName}</h3>
									<span>{event.category}</span>
								</div>
							);
						})}
				</div>
			</main>
		</div>
	);
};

export default Home;
