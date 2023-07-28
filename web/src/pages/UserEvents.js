//hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';

import { months, dates } from '../misc/dateTime';
import noImage from '../misc/no-event-image.jpg';

// compononets
import UserNav from '../components/UserNav';

const UserEvents = () => {
	const [isDeleted, setIsDeleted] = useState(false);

	const { events, getEvents, deleteEvent } = useEvents();

	useEffect(() => {
		setIsDeleted(false);
		getEvents();
	}, [isDeleted]);

	const handleClick = async (id) => {
		const deleted = deleteEvent(id);
		if (deleted) {
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
								<div className='buttons flex gap-20'>
									<Link
										to={`/user/events/update/${event._id}`}
										onClick={() => handleClick(event._id)}
										className='btn-purpleToWhite width-150'>
										Edit Event
									</Link>
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
