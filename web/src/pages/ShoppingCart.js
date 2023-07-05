import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const ShoppingCart = () => {
	const { getCart, cart, isLoading, error } = useCart();
	useEffect(() => {
		if (!cart) getCart();
	});

	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart &&
				cart.cartItems.map((item) => (
					<p key={item.event._id}>{item.event.eventName}</p>
				))}
		</div>
	);
};

export default ShoppingCart;
