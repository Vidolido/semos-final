//hooks
import { useEffect, useState } from 'react';
import { useEventsContext } from '../hooks/useEventsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { SET_EVENTS } from '../misc/actionTypes';
import { months, dates } from '../misc/dateTime';
import noImage from '../misc/no-event-image.jpg';

// compononets
import UserNav from '../components/UserNav';

const UserEvents = () => {
	const [isDeleted, setIsDeleted] = useState(false);
	const { user } = useAuthContext();
	const { events, dispatch } = useEventsContext();
	useEffect(() => {
		setIsDeleted(false);
		const getEvents = async () => {
			const res = await fetch(`/api/v1/events/user-events`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json',
				},
			});
			const jsonRes = await res.json();
			if (res.ok) {
				dispatch({ type: SET_EVENTS, payload: jsonRes });
			}
		};
		getEvents();
	}, [user, isDeleted, dispatch]);

	const handleClick = async (id) => {
		let deleteEvent = await fetch(`/api/v1/events/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});
		if (deleteEvent.ok) {
			dispatch({ type: 'DELETE_EVENT', payload: id });
			setIsDeleted(true);
		}
	};
	return (
		<div>
			<UserNav title='Events' />
			<div className='userEvents'>
				{events &&
					events.map((event) => {
						let date = new Date(event.eventDate);

						return (
							<div key={event._id} className='singleUserEvents'>
								<div className='info'>
									<div className='imageContainer'>
										<img src={noImage} alt='' />
									</div>
									<div className='basic'>
										<h2 className='mb-10'>{event.eventName}</h2>
										<div className='dateLocation'>
											<h3 className='block boldText purpleText'>{`${
												months[date.getMonth()]
											} ${date.getDate()}${
												dates[date.getDate()]
											}, ${date.getFullYear()}`}</h3>
											<h3 className='ml-10'>{event.location}</h3>
										</div>
									</div>
								</div>
								<div className='buttons'>
									<button
										onClick={() => handleClick(event._id)}
										className='btn-blackToTransparent width-150'>
										Delete Event
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default UserEvents;
