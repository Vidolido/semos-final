import { useState, useEffect } from 'react';
import UserNav from '../components/UserNav';

import { useTickets } from '../hooks/useTickets';

import EventCard from '../components/EventCard';
import Ticket from '../components/Ticket';

const TicketHisotry = () => {
	const ticketModalOptions = {
		show: false,
	};
	const { getTickets } = useTickets();
	const [tickets, setTickets] = useState(null);
	const [options, setOptions] = useState(ticketModalOptions);

	useEffect(() => {
		getTickets().then((allTickets) => setTickets(allTickets));
	}, []);

	const handleClick = (event) => {
		setOptions((prevState) => ({
			show: true,
			event,
		}));
	};
	return (
		<div className='ticketHistory'>
			<UserNav title='Ticket Hisotry' />
			<div className='twoColumnGrid'>
				{tickets &&
					tickets.map((ticket, index) => {
						let opacity = Date.now() > new Date(ticket.event.eventDate);
						return (
							<div
								key={index}
								className={`categoryEvents eventGrid ${
									opacity && 'opacity5'
								} `}>
								<EventCard event={ticket.event} showDiscription={true} />
								<div className='buttons buttonItems item5'>
									<button
										className='btn-blackToPurple'
										onClick={() => handleClick(ticket.event)}>
										Print Ticket
									</button>
								</div>
							</div>
						);
					})}
			</div>
			{options.show && <Ticket options={options} setOptions={setOptions} />}
		</div>
	);
};

export default TicketHisotry;
