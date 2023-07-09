import { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';

import { useAuthContext } from '../hooks/useAuthContext';

// TODO: Да го префрлам useEffect во Ticket компонента.
const TicketHisotry = () => {
	const { user } = useAuthContext();
	const [tickets, setTickets] = useState(null);

	useEffect(() => {
		const getTickets = async () => {
			const res = await fetch('/api/v1/tickets', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json',
				},
			});
			const jsonRes = await res.json();
			// console.log(jsonRes);

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
			{/* {console.log(tickets)} */}
			<UserNav title='Ticket Hisotry' />
			<h2>Ticket Hisotry</h2>
			{tickets &&
				tickets.map((ticket) => <div key={ticket._id}>{ticket.eventId}</div>)}
		</div>
	);
};

export default TicketHisotry;
