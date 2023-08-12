import { useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

import EventCard from '../components/EventCard';

const ShoppingCart = () => {
	let navigate = useNavigate();
	const { getCart, removeFromCart, cart } = useCart();

	useEffect(() => {
		getCart();
	}, []);

	const handleClick = async (id) => {
		removeFromCart(id);
	};
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
						return (
							<div key={item.event._id} className='shoppingCartFlex'>
								<EventCard event={item.event} groupItems={true} />
								<div className='buttons buttonItems item5'>
									<p className='boldText bigText'>
										${item.event.ticketPrice * item.numberOfTickets} USD
									</p>
									<p className='purpleText boldText bigText'>
										{item.numberOfTickets} x ${item.event.ticketPrice} USD
									</p>
									<button
										onClick={() => handleClick(item.event._id)}
										className='btn-blackToTransparent width-150'>
										Remove
									</button>
								</div>
							</div>
						);
					}
				})}
			<div className='cartBottomButtons'>
				<button
					className='btn-blackToTransparent width-150'
					onClick={() => navigate(-1)}>
					Back
				</button>
				{cart && cart.cartItems.length !== 0 && (
					<button
						className='btn-purpleToWhite width-150'
						onClick={() => navigate('/user/cart/checkout')}>
						Check Out
					</button>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
