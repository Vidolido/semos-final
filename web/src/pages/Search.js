import { useParams, Link } from 'react-router-dom';
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
				events.map((event) => {
					return (
						<div key={event._id} className='eventCardFlex'>
							<EventCart event={event} groupItems={true} />
							<div className='buttons buttonItems item5'>
								<Link
									className='btn-blackToPurple'
									to={`/events/about/${event._id}`}>
									Get Tickets
								</Link>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Search;
