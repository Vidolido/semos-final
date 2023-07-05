import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
// import { useEventsContext } from './useEventsContext';
import { useCartContext } from './useCartContext';

import { SET_CART, DELETE_CART } from '../misc/actionTypes';

// Логика на frontend апликацијата
// TODO: Да ги сместам функциите за работа со база и state на апликацијата
// во еден фајл(auth, events, cart секое засебно). React hooks да ми користат како handler-и за frontend.

export const useCart = () => {
	const { cart, dispatch } = useCartContext();
	const [error, setError] = useState(null); // Ерор објект со клучеви за сите функции
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();

	const addToCart = async (form, id) => {
		setIsLoading(true);
		setError(null);

		// TODO: Да најдам друг начин за numberOfTickets
		let numberOfTickets = Number(
			Array.from(form.target.children).filter(
				(input) => input.name === 'numberOfTickets'
			)[0].value
		);

		let payload = {
			event: id.toString(),
			numberOfTickets,
		};

		try {
			const add = await fetch('/api/v1/cart/add', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			const addJson = await add.json();

			if (add.ok) {
				// TODO: Овде да направам логика, доколку го има евентот во кошница
				// да праша дали сака да додаде уште карти на веќе постоечкиот број.
				console.log(add, addJson);
				dispatch({ type: SET_CART, payload: cart });
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

		try {
			const setCart = await fetch(`/api/v1/cart/get`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			const cartJson = await setCart.json();
			dispatch({ type: SET_CART, payload: cartJson });
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
