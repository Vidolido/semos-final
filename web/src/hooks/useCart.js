import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

import { SET_CART, DELETE_CART, REMOVE_FROM_CART } from '../misc/actionTypes';

export const useCart = () => {
	const { user } = useAuthContext();
	const { cart, dispatch } = useCartContext();
	const [error, setError] = useState(null); // Ерор објект со клучеви за сите функции
	const [isLoading, setIsLoading] = useState(null);

	const headers = {
		Authorization: user ? `Bearer ${user.token}` : '',
		'Content-Type': 'application/json',
	};

	const addToCart = async (numberOfTickets, id) => {
		setIsLoading(true);
		setError(null);

		let payload = {
			event: id.toString(),
			numberOfTickets: Number(numberOfTickets),
		};

		try {
			const add = await fetch('/api/v1/cart/add', {
				method: 'POST',
				headers,
				body: JSON.stringify(payload),
			});
			const addJson = await add.json();

			if (!add.ok) {
				setIsLoading(false);
				setError(addJson.errors);
			}

			if (add.ok) {
				// TODO: Овде да направам логика, доколку го има евентот во кошница
				// да праша дали сака да додаде уште карти на веќе постоечкиот број.
				setIsLoading(false);
				setError(null);
				getCart();
			}
		} catch (err) {
			console.log(err);
			if (err) {
				setError(err);
			}
		}
	};

	const getCart = async () => {
		setIsLoading(true);
		setError(null);

		if (!user) return;

		const setCart = await fetch(`/api/v1/cart/get`, {
			method: 'GET',
			headers,
		});

		const cartJson = await setCart.json();

		if (setCart.ok) {
			dispatch({ type: SET_CART, payload: cartJson });
			setIsLoading(false);
			setError(null);
		}
	};

	const getTotal = async () => {
		setIsLoading(true);
		setError(null);

		const getCart = await fetch(`/api/v1/cart/getTotal`, {
			method: 'GET',
			headers,
		});

		const cartJson = await getCart.json();

		return cartJson;
	};

	const removeFromCart = async (id) => {
		setIsLoading(true);
		setError(null);

		let res = await fetch(`/api/v1/cart/remove/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			dispatch({ type: REMOVE_FROM_CART, payload: id });
			setIsLoading(false);
		}
	};

	const clearCart = async () => {
		setIsLoading(true);
		setError(null);

		let res = await fetch('/api/v1/cart/clear', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			dispatch({ type: DELETE_CART });
		}
	};

	return {
		addToCart,
		getCart,
		getTotal,
		removeFromCart,
		clearCart,
		cart,
		isLoading,
		error,
	};
};
