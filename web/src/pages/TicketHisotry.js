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
	return (
		<div className='ticketHistory'>
			<UserNav title='Ticket Hisotry' />
			<div className='twoColumnGrid'>
				{tickets &&
					tickets.map((ticket) => {
						let opacity = Date.now() > new Date(ticket.event.eventDate);
						return (
							<div
								key={ticket.event._id}
								className={`categoryEvents eventGrid ${
									opacity && 'opacity5'
								} `}>
								<EventCard event={ticket.event} showDiscription={true} />
								<div className='buttons buttonItems item5'>
									<button className='btn-blackToPurple'>Print Ticket</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default TicketHisotry;
