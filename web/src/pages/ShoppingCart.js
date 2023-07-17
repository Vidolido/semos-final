import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
// import { useAuthContext } from '../hooks/useAuthContext';

const ShoppingCart = () => {
	const {
		getCart,
		cart,
		isLoading: cartIsLoading,
		error: cartError,
	} = useCart();

	useEffect(() => {
		// Работи последен пат кога е пробано...
		// Да пробам со isLoading
		const fetchData = async () => {
			if (!cart && !cartIsLoading) {
				await getCart();
			}
		};
		fetchData();
	}, [cartIsLoading, cart, getCart]);
	console.log(cart);
	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart && !cart.cartItems.length && (
				<h2>You have no items in your cart. </h2>
			)}
			{cart &&
				cart.cartItems.map((item) => (
					<div key={item.event._id}>
						<p>{item.event.eventName}</p>
						<p>{item.event.ticketPrice}</p>
						<p>{item.numberOfTickets}</p>
					</div>
				))}
		</div>
	);
};

export default ShoppingCart;
