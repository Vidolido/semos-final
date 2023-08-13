import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useEvents } from '../hooks/useEvents';

import EventCart from '../components/EventCard';

const Search = () => {
	const { searchTerm } = useParams();
	const { searchEvents } = useEvents();
	const [events, setEvents] = useState();

	useEffect(() => {
		searchEvents(searchTerm).then((events) => setEvents(events));
	}, [searchTerm]);

	return (
		<div>
			<h1>Search Results for: {searchTerm}</h1>
			{events &&
				events.map((event) => <EventCart key={event._id} event={event} />)}
		</div>
	);
};

export default Search;
