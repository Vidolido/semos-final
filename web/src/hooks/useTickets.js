import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useTickets = () => {
	const { user } = useAuthContext();
	const { cart } = useCartContext();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const buyTickets = async (cartItems) => {
		setIsLoading(true);
		setError(null);
		console.log(cartItems, 'VO USETICKETS');
		const res = await fetch('/api/v1/buy-tickets', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});
	};

	return { buyTickets };
};
