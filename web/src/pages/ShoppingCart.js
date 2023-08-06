import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

import EventCard from '../components/EventCard';

const ShoppingCart = () => {
	let navigate = useNavigate();
	const [isDeleted, setIsDeleted] = useState(false);

	const {
		getCart,
		removeFromCart,
		cart,
		isLoading: cartIsLoading,
		error: cartError,
	} = useCart();

	useEffect(() => {
		if (isDeleted || !cart || (cartIsLoading && !cartError)) {
			getCart();
		}
		setIsDeleted(false);
	}, []);
	const handleClick = async (id) => {
		removeFromCart(id);
		setIsDeleted(true);
		// console.log('Clicked!');
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
				{/* <Link onClick={() => navigate(-1)}>Back</Link> */}
				<button
					className='btn-blackToTransparent width-150'
					onClick={() => navigate(-1)}>
					Back
				</button>
				<Link className='btn-purpleToWhite width-150' to='/user/cart/checkout'>
					Check Out
				</Link>
			</div>
		</div>
	);
};

export default ShoppingCart;
