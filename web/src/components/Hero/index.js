import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useEvents } from '../../hooks/useEvents';
import { useStorage } from '../../hooks/useStorage';

import { months, dates } from '../../misc/dateTime';
// import noImage from '../../misc/no-event-image.jpg';

const Hero = () => {
	const { heroEvent, getHero, error } = useEvents();
	const { downloadFile } = useStorage();
	const [image, setImage] = useState();
	const [date, setDate] = useState();

	useEffect(() => {
		getHero();
	}, []);

	useEffect(() => {
		heroEvent &&
			!heroEvent.message &&
			downloadFile(heroEvent.eventImage).then((file) => setImage(file));
	});

	useEffect(() => {
		heroEvent && heroEvent.eventDate && setDate(new Date(heroEvent.eventDate));
	}, [heroEvent]);
	// console.log(heroEvent, error);
	return (
		heroEvent && (
			<div
				className='hero'
				style={{
					backgroundImage: `url("${image}")`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}>
				<div className='heroContent'>
					<div className='info'>
						<h1>{heroEvent.eventName}</h1>
						{date && (
							<span>
								{`${months[date.getMonth()]} ${date.getDate()}${
									dates[date.getDate()]
								}, ${date.getFullYear()}`}
								,{' '}
							</span>
						)}
						<span>{heroEvent.location}</span>
					</div>
					<div className='buttons'>
						<Link
							className='btn-whiteToPurple'
							to={`/events/about/${heroEvent._id}`}>
							Get Tickets
						</Link>
					</div>
				</div>
			</div>
		)
	);
};

export default Hero;
