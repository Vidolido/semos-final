import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';

import SingleEvent from '../components/SingleEvent';
const About = () => {
	const { id } = useParams();

	const {
		getSingleEvent,
		event,
		isLoading: eventIsLoading,
		error: eventError,
	} = useEvents();

	useEffect(() => {
		const fetchData = async (id) => {
			if (eventIsLoading === null) {
				return await getSingleEvent(id);
			}
		};
		fetchData(id);
	});

	return <div className='about'>{event && <SingleEvent event={event} />}</div>;
};

export default About;
