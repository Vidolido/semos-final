import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

import EventCard from '../components/EventCard';

const CheckOut = () => {
	const navigate = useNavigate();
	const [total, setTotal] = useState(0);
	const [formInput, setFormInput] = useState({
		fullName: '',
		cardNo: '',
		expires: '',
		pin: '',
	});
	const {
		getCart,
		cart,
		// isLoading: cartIsLoading,
		// error: cartError,
	} = useCart();
	useEffect(() => {
		cart &&
			cart.cartItems.forEach((item) => {
				console.log(item);
				let result = item.numberOfTickets * item.event.ticketPrice;
				setTotal((total) => {
					console.log(total);
					return total + result;
				});
			});
	}, []);
	// useEffect(() => {
	// 	getCart();
	// 	// cart &&
	// 	// 	cart.cartItems.forEach((item) => {
	// 	// 		console.log(item);
	// 	// 		let result = item.numberOfTickets * item.event.ticketPrice;
	// 	// 		setTotal(total + result);
	// 	// 	});
	// }, []);

	// useEffect(() => {
	// 	// if (cart) {

	// 	cart &&
	// 		cart.cartItems.forEach((item) => {
	// 			console.log(item);
	// 			let result = item.numberOfTickets * item.event.ticketPrice;
	// 			setTotal(total + result);
	// 		});
	// 	// }
	// }, [cart]);
	console.log(cart);
	const handleOnChange = (e) => {
		setFormInput((formInput) => {
			return {
				...formInput,
				[e.target.name]: e.target.value,
			};
		});
		console.log(formInput);
	};

	const handleClick = () => {
		navigate('/user/cart/thank-you');
	};
	console.log(total);
	return (
		<div>
			<h1>Checkout</h1>
			<div className='checkoutContainer'>
				<div className='itemsContainer'>
					{cart &&
						cart.cartItems &&
						cart.cartItems.map((item) => {
							if (!item.event) {
								return 'The event was deleted.';
							} else {
								let result = item.event.ticketPrice * item.numberOfTickets;

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
										</div>
									</div>
								);
							}
						})}
					<hr />
					<h3>Total: ${total} USD</h3>
				</div>
				<div className='formContainer'>
					<form className='form'>
						<div className='inputContainer'>
							<label>Full Name</label>
							<input
								type='text'
								name='fullName'
								value={formInput.fullName}
								onChange={handleOnChange}
							/>
							{/* {eventError && eventError['tickets'] && (
								<span className='error'>{eventError['tickets']}</span>
							)} */}
						</div>
						<div className='inputContainer'>
							<label>Card No.</label>
							<input
								type='text'
								name='cardNo'
								value={formInput.cardNo}
								onChange={handleOnChange}
							/>
							{/* {eventError && eventError['tickets'] && (
								<span className='error'>{eventError['tickets']}</span>
							)} */}
						</div>
						<div className='inputContainer'>
							<label>Expires</label>
							<input
								type='date'
								name='expires'
								value={formInput.expires}
								onChange={handleOnChange}
							/>
							{/* {eventError && eventError['tickets'] && (
								<span className='error'>{eventError['tickets']}</span>
							)} */}
						</div>
						<div className='inputContainer'>
							<label>PIN</label>
							<input
								type='text'
								name='pin'
								value={formInput.pin}
								onChange={handleOnChange}
							/>
							{/* {eventError && eventError['tickets'] && (
								<span className='error'>{eventError['tickets']}</span>
							)} */}
						</div>
					</form>
				</div>
			</div>
			<div className='cartBottomButtons'>
				{/* <Link onClick={() => navigate(-1)}>Back</Link> */}
				<button
					className='btn-blackToTransparent width-150'
					onClick={() => navigate(-1)}>
					Back
				</button>
				<button className='btn-purpleToWhite width-150' onClick={handleClick}>
					Pay Now
				</button>
			</div>
		</div>
	);
};

export default CheckOut;
