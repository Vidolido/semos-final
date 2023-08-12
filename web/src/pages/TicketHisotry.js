import { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';

// import { useAuthContext } from '../hooks/useAuthContext';

// import { useAuth } from '../hooks/useAuth';
import { useTickets } from '../hooks/useTickets';

import EventCard from '../components/EventCard';

const TicketHisotry = () => {
	// const { user } = useAuthContext();
	// const { user } = useAuth();
	const { getTickets } = useTickets();
	const [tickets, setTickets] = useState(null);

	useEffect(() => {
		getTickets().then((allTickets) => setTickets(allTickets));
	}, []);
	console.log(tickets);
	return (
		<div className='ticketHistory'>
			{/* {console.log(tickets)} */}
			<UserNav title='Ticket Hisotry' />
			<h2>Ticket Hisotry</h2>
			{tickets && tickets.map((ticket) => <EventCard event={ticket.event} />)}
		</div>
	);
};

export default TicketHisotry;
