import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Cart = () => {
	const { user } = useAuthContext();
	const [cart, setCart] = useState(null);

	// samo kolku za test
	useEffect(() => {
		const getEvents = async () => {
			const res = await fetch(`/api/v1/cart/get`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const jsonRes = await res.json();
			setCart(jsonRes);
			// if (res.ok) {
			// 	dispatch({ type: actionType, payload: jsonRes });
			// }
		};
		getEvents();
	}, [user]);
	return (
		<div>
			<h1>Shopping Cart</h1>
			{cart && cart.cartItems.map((item) => <p>{item}</p>)}
			{/* {console.log(cart)} */}
		</div>
	);
};

export default Cart;
