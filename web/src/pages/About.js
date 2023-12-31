import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';

import SingleEvent from '../components/SingleEvent';
const About = () => {
	const { id } = useParams();
	const { getSingleEvent, clearState, event } = useEvents();

	useEffect(() => {
		clearState();
	}, []);

	useEffect(() => {
		getSingleEvent(id);
	}, [id]);

	return <div className='about'>{event && <SingleEvent event={event} />}</div>;
};

export default About;
