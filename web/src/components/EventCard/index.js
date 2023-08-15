import { useState, useEffect, Fragment } from 'react';

import { useStorage } from '../../hooks/useStorage';

import { months, dates } from '../../misc/dateTime';
import noImage from '../../misc/no-event-image.jpg';

const EventCard = ({ event, showDiscription, groupItems }) => {
	const { downloadFile } = useStorage();
	const [image, setImage] = useState(null);

	let date = new Date(event.eventDate);

	useEffect(() => {
		downloadFile(event.eventImage).then((file) => setImage(file));
	}, []);

	return (
		<Fragment>
			<div className='eventImageContainer item6 imageItem'>
				{!image ? (
					<img className='eventImage' src={noImage} alt='Tickets for events' />
				) : (
					<Fragment>
						<img className='eventImage' src={image} alt='Tickets for events' />
					</Fragment>
				)}
			</div>
			{groupItems && (
				<div className='eventInfo contentItems item1'>
					<h3 className='item1'>{event.eventName}</h3>
					<span className='block purpleText boldText mediumText item2'>{`${
						months[date.getMonth()]
					} ${date.getDate()}${
						dates[date.getDate()]
					}, ${date.getFullYear()}`}</span>

					{showDiscription && (
						<p className='cardExcerpt mediumText item3'>
							{event.details.substr(0, 120)}
						</p>
					)}
					<span className='mediumText item4'>{event.location}</span>
				</div>
			)}
			{!groupItems && (
				<Fragment>
					<h3 className='item1'>{event.eventName}</h3>
					<span className='block purpleText boldText mediumText item2'>{`${
						months[date.getMonth()]
					} ${date.getDate()}${
						dates[date.getDate()]
					}, ${date.getFullYear()}`}</span>

					{showDiscription && (
						<p className='cardExcerpt mediumText item3'>
							{event.details.substr(0, 120)}
						</p>
					)}
					<span className='mediumText item4'>{event.location}</span>
				</Fragment>
			)}
		</Fragment>
	);
};

export default EventCard;
