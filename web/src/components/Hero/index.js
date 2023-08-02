import { useEffect, useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { useStorage } from '../../hooks/useStorage';

const Hero = () => {
	// const [heroEvent, setHeroEvent] = useState();
	const { heroEvent, getHero } = useEvents();
	const { downloadFile } = useStorage();
	const [image, setImage] = useState();

	useEffect(() => {
		getHero();
	}, []);
	useEffect(() => {
		heroEvent &&
			heroEvent.eventImage &&
			downloadFile(heroEvent.eventImage).then((file) => setImage(file));
	}, [heroEvent]);

	return (
		heroEvent && (
			<div className='hero'>
				<img src={image} alt={heroEvent.name} />
				<h2>{heroEvent.eventName}</h2>
			</div>
		)
	);
};

export default Hero;
