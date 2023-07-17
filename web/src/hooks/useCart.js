import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
// import { useEventsContext } from './useEventsContext';
import { useCartContext } from './useCartContext';

import { SET_CART, DELETE_CART } from '../misc/actionTypes';

// Логика на frontend апликацијата
// TODO: Да ги сместам функциите за работа со база и state на апликацијата
// во еден фајл(auth, events, cart секое засебно). React hooks да ми користат како handler-и за frontend.

export const useCart = () => {
	const { user } = useAuthContext();
	const { cart, dispatch } = useCartContext();
	const [error, setError] = useState(null); // Ерор објект со клучеви за сите функции
	const [isLoading, setIsLoading] = useState(null);

	const headers = {
		// Authorization: `Bearer ${user.token}`,
		// Authorization: ``,
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
				// dispatch({ type: SET_CART, payload: cart });

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
		// console.log(cart, user);
		try {
			if (!user) return;

			const setCart = await fetch(`/api/v1/cart/get`, {
				method: 'GET',
				headers,
			});

			const cartJson = await setCart.json();
			// console.log(cartJson);
			if (setCart.ok) {
				dispatch({ type: SET_CART, payload: cartJson });
				setIsLoading(false);
			}
			// return cartJson;
		} catch (err) {
			console.log(err);
			if (err) {
				setError(err);
			}
		}
	};

	// TODO: Да ја избришам на крај, само за тест
	const clearCart = async () => {
		setIsLoading(true);
		setError(null);
		dispatch({ type: DELETE_CART });
	};

	return { addToCart, getCart, clearCart, cart, isLoading, error };
};
