import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const ShoppingCart = () => {
	const {
		getCart,
		cart,
		isLoading: cartIsLoading,
		error: cartError,
	} = useCart();
	useEffect(() => {
		const fetchData = async () => {
			if (!cart && !cartIsLoading) {
				await getCart();
			}
		};
		fetchData();
	}, [cartIsLoading, cart]);

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart && !cart.cartItems.length && (
				<h2>You have no items in your cart. </h2>
			)}
			{cart &&
				cart.cartItems &&
				cart.cartItems.map((item) => {
					if (!item) {
						return 'The event was deleted.';
					} else {
						return (
							<div key={item.event._id}>
								<p>{item.event.eventName}</p>
								<p>{item.event.ticketPrice}</p>
								<p>{item.numberOfTickets}</p>
							</div>
						);
					}
				})}
		</div>
	);
};

export default ShoppingCart;
