import { useEffect } from 'react';
import { useEvents } from '../../hooks/useEvents';

const Hero = () => {
	const { heroEvent, getHero } = useEvents();
	useEffect(() => {
		if (!heroEvent) {
			getHero();
		}
	});
	return heroEvent && <div className='hero'></div>;
};

export default Hero;
