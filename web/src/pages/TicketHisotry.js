import { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';

import { useTickets } from '../hooks/useTickets';

import EventCard from '../components/EventCard';

const TicketHisotry = () => {
	const { getTickets } = useTickets();
	const [tickets, setTickets] = useState(null);

	useEffect(() => {
		getTickets().then((allTickets) => setTickets(allTickets));
	}, []);
	console.log(tickets);
	return (
		<div className='ticketHistory'>
			<UserNav title='Ticket Hisotry' />
			<h2>Ticket Hisotry</h2>
			{tickets &&
				tickets.map((ticket) => (
					<EventCard key={ticket.event._id} event={ticket.event} />
				))}
		</div>
	);
};

export default TicketHisotry;
