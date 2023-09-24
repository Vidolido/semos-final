import { Link } from 'react-router-dom';

//hooks
import { useEffect, useState } from 'react';
import { useEvents } from '../hooks/useEvents';

// compononets
import UserNav from '../components/UserNav';
import EventCard from '../components/EventCard';
import Modal from '../components/Modal';

const UserEvents = () => {
	const initialModalState = {
		show: false,
		message: '',
		action: '',
		id: '',
	};

	const [isDeleted, setIsDeleted] = useState(false);
	const [modalOptions, setModalOptions] = useState(initialModalState);

	const { events, getEvents } = useEvents();

	useEffect(() => {
		setIsDeleted(false);
		getEvents();
	}, [isDeleted]);

	const handleClick = async (id) => {
		console.log('Clicked in userEvents');
		setModalOptions(() => ({
			show: true,
			message: 'You are about to delete an event from the system.',
			action: 'deleteEvent',
			button: 'Delete Event',
			id,
		}));
		// if (isDeleted) {
		// 	setReset(true);
		// }
		// const deleted = deleteEvent(id);
		// if (deleted) {
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
			{modalOptions.show && (
				<Modal
					modalOptions={modalOptions}
					setModalOptions={setModalOptions}
					setIsDeleted={setIsDeleted}
				/>
			)}
		</div>
	);
};

export default UserEvents;
