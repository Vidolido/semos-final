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
						<div>
							<EventCard event={ticket.event} groupItems={true} />
						</div>
					);
				})}
		</div>
	);
};

export default ThankYou;
