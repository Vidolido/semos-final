import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';

// Логика на frontend апликацијата
// TODO: Да ги сместам функциите за работа со база и state на апликацијата
// во еден фајл(auth, events, cart секое засебно). React hooks да ми користат како handler-и за frontend.

export const useCart = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();
	const { dispatch } = useEventsContext();

	const addToCart = async (form, id) => {
		setIsLoading(true);
		setError(null);
		console.log(form, id);
		// TODO: Да најдам друг начин за numberOfTickets
		let numberOfTickets = Number(
			Array.from(form.target.children).filter(
				(input) => input.name === 'numberOfTickets'
			)[0].value
		);

		let payload = {
			eventId: id.toString(),
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

			console.log(add);
		} catch (err) {
			console.log(err);
			if (err) {
				setError(err);
			}
		}

		// let numberOfTickets = Array.from(form.target.children).map(
		// 	(input) => input.name === 'numberOfTickets' && input.value
		// );
		console.log(numberOfTickets);
	};

	return { addToCart, isLoading, error };
};
