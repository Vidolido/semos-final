import { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';

const TicketHisotry = () => {
	const [tickets, setTickets] = useState(null);

	useEffect(() => {
		const getTickets = async () => {
			const res = await fetch('/api/v1/tickets');
			const jsonRes = await res.json();
			console.log(jsonRes);

			if (res.ok) {
				setTickets(jsonRes);
			}
			// if (res.ok) {
			// 	dispatch({ type: SET_EVENTS, payload: jsonRes });
			// }
		};
		getTickets();
	}, []);

	return (
		<div className='ticketHistory'>
			<UserNav title='Ticket Hisotry' />
			<h2>Ticket Hisotry</h2>
			{tickets &&
				tickets.map((ticket) => <div key={ticket._id}>{ticket.eventId}</div>)}
		</div>
	);
};

export default TicketHisotry;
