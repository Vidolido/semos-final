import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

import EventCard from '../components/EventCard';

const ShoppingCart = () => {
	const {
		getCart,
		cart,
		isLoading: cartIsLoading,
		error: cartError,
	} = useCart();

	useEffect(() => {
		if (!cart || (cartIsLoading && !cartError)) {
			getCart();
		}
	});

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart && !cart.cartItems.length && (
				<h2>You have no items in your cart. </h2>
			)}
			{cart &&
				cart.cartItems &&
				cart.cartItems.map((item) => {
					if (!item.event) {
						return 'The event was deleted.';
					} else {
						{
							/* return (
							<div key={item.event._id}>
								<p>{item.event.eventName}</p>
								<p>{item.event.ticketPrice}</p>
								<p>{item.numberOfTickets}</p>
							</div>
						); */
						}
						return <EventCard event={item.event} />;
					}
				})}
		</div>
	);
};

export default ShoppingCart;
