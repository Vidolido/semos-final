import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';
import { useTickets } from '../hooks/useTickets';

import EventCard from '../components/EventCard';

const CheckOut = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [total, setTotal] = useState(0);
	const [formInput, setFormInput] = useState({
		fullName: '',
		cardNo: '',
		expires: '',
		pin: '',
	});
	const { cart, getTotal, clearCart } = useCart();
	const { buyTickets } = useTickets();

	const errorMessages = {
		fullName: 'Please write your full name',
		cardNo: 'The card number is required',
		expires: 'Please select an expiery date',
		pin: 'Card pin is required',
	};

	useEffect(() => {
		getTotal().then((sum) => setTotal(sum.total));
	}, []);
	useEffect(() => {
		const isEmpty = Object.values(errors).every(
			(err) => err === null || err === ''
		);
		if (isEmpty && Object.keys(errors).length > 0) {
			buyTickets();
			setErrors({});
			clearCart();
			navigate('/user/cart/thank-you');
		}
	}, [errors]);

	const handleOnChange = (e) => {
		setFormInput((formInput) => {
			return {
				...formInput,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleClick = () => {
		Object.entries(formInput).forEach((input) => {
			if (!input[1]) {
				setErrors((errors) => {
					return { ...errors, [input[0]]: errorMessages[input[0]] };
				});
			} else {
				setErrors((errors) => {
					return { ...errors, [input[0]]: '' };
				});
			}
		});
	};
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
								required={true}
							/>
							{errors && errors.fullName && <span>{errors.fullName}</span>}
						</div>
						<div className='inputContainer'>
							<label>Card No.</label>
							<input
								type='text'
								name='cardNo'
								value={formInput.cardNo}
								onChange={handleOnChange}
								required={true}
							/>
							{errors && errors.cardNo && <span>{errors.cardNo}</span>}
						</div>
						<div className='inputContainer'>
							<label>Expires</label>
							<input
								type='date'
								name='expires'
								value={formInput.expires}
								onChange={handleOnChange}
								required={true}
							/>
							{errors && errors.expires && <span>{errors.expires}</span>}
						</div>
						<div className='inputContainer'>
							<label>PIN</label>
							<input
								type='text'
								name='pin'
								value={formInput.pin}
								onChange={handleOnChange}
							/>
							{errors && errors.pin && <span>{errors.pin}</span>}
						</div>
					</form>
				</div>
			</div>
			<div className='cartBottomButtons'>
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
