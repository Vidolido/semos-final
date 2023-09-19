import { Link } from 'react-router-dom';

//hooks
import { useEffect, useState } from 'react';
import { useEvents } from '../hooks/useEvents';

// compononets
import UserNav from '../components/UserNav';
import EventCard from '../components/EventCard';
const UserEvents = ({ modalOptions, setModalOptions }) => {
	const [isDeleted, setIsDeleted] = useState(false);
	const { events, getEvents, deleteEvent } = useEvents();

	useEffect(() => {
		setIsDeleted(false);
		getEvents();
	}, [isDeleted]);

	const handleClick = async (id) => {
		console.log('Clicked in userEvents');
		setModalOptions((prevState) => ({
			...prevState,
			show: true,
		}));
		// const deleted = deleteEvent(id);
		// if (deleted) {
		// 	setIsDeleted(true);
		// }
	};
	console.log(modalOptions, 'SOMETHING');
	return (
		<div>
			<UserNav title='Events' />
			<div className='userEvents'>
				{events &&
					events.map((event) => (
						<div key={event._id} className='eventCardFlex'>
							<EventCard
								event={event}
								showDiscription={false}
								groupItems={true}
							/>
							<div className='buttons flex gap-20'>
								<Link
									to={`/user/update-event/${event._id}`}
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
					))}
			</div>
		</div>
	);
};

export default UserEvents;
