import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useStorage } from '../../hooks/useStorage';

import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const EventCard = ({ event }) => {
	const { downloadFile } = useStorage();
	const [image, setImage] = useState(null);

	let date = new Date(event.eventDate);

	useEffect(() => {
		downloadFile(event.eventImage).then((file) => setImage(file));
	}, []);

	return (
		<div className='eventCard'>
			<div className='eventImageContainer'>
				{!image ? (
					<img className='eventImage' src={noImage} alt='Tickets for events' />
				) : (
					<Fragment>
						<img className='eventImage' src={image} alt='Tickets for events' />
					</Fragment>
				)}
			</div>
			<div className='eventInfo'>
				<h3>{event.eventName}</h3>

				<span className='block purpleText boldText mediumText'>{`${
					months[date.getMonth()]
				} ${date.getDate()}${
					dates[date.getDate()]
				}, ${date.getFullYear()}`}</span>

				<p className='cardExcerpt mediumText'>{event.details.substr(0, 120)}</p>

				<div className='cardBottom'>
					<span className='mediumText'>{event.location}</span>
					<Link className='btn-blackToPurple' to={`/events/about/${event._id}`}>
						Get Tickets
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
