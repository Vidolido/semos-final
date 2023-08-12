import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useTickets = () => {
	const { user } = useAuthContext();
	const { cart } = useCartContext();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const getTickets = async () => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/tickets/get', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		if (res.ok) {
			setIsLoading(false);
			setError(null);
			return jsonRes;
		}
	};

	const buyTickets = async () => {
		setIsLoading(true);
		setError(null);
		const res = await fetch('/api/v1/tickets/buy-tickets', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cart.cartItems),
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		if (res.ok) {
			setIsLoading(false);
			setError(null);
			console.log(res, jsonRes);
		}
	};

	return { getTickets, buyTickets, error, isLoading };
};
