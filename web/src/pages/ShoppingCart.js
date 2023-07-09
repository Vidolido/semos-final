import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
// import { useAuthContext } from '../hooks/useAuthContext';

const ShoppingCart = () => {
	const { getCart, cart, isLoading, error } = useCart();
	useEffect(() => {
		// Работи последен пат кога е пробано...
		const fetchData = async () => {
			if (!cart) {
				await getCart();
			}
		};
		fetchData();
	}, [cart, getCart]);
	return (
		<div>
			<h1>Shopping Cart</h1>
			{/* {!cart && getCart()} */}
			{cart &&
				cart.cartItems.map((item) => (
					<p key={item.event._id}>{item.event.eventName}</p>
				))}
		</div>
	);
};

export default ShoppingCart;
