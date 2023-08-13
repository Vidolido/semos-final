import { useEffect, useState } from 'react';

// hooks
import { useCart } from '../hooks/useCart';

// components
import EventCard from '../components/EventCard';

const ThankYou = () => {
	const [boughtTickets, setBoughtTickets] = useState();
	const { cart, clearCart } = useCart();

	useEffect(() => {
		cart && setBoughtTickets(cart.cartItems);
		clearCart();
	}, []);

	return (
		<div>
			<h1>Thank you for your purchase!</h1>
			{boughtTickets &&
				boughtTickets.map((ticket) => {
					return (
						<div key={ticket.event._id} className='eventCardFlex'>
							<EventCard event={ticket.event} groupItems={true} />
							<div className='buttons buttonItems item5'>
								<p className='boldText bigText'>
									${ticket.event.ticketPrice * ticket.numberOfTickets} USD
								</p>
								<p className='purpleText boldText bigText'>
									{ticket.numberOfTickets} x ${ticket.event.ticketPrice} USD
								</p>
								<button className='btn-blackToPurple'>Print</button>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ThankYou;
