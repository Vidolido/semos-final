import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; // ќе видам дали ми треба
import { useEventsContext } from './useEventsContext';
// import { LOGIN } from '../misc/actionTypes';

export const useCreateEvent = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();
	const { dispatch } = useEventsContext();

	const createEvent = async (createEventOptions) => {
		setIsLoading(true);
		setError(null);
		console.log(user.token, 'from useCreateEvent hook');
		const res = await fetch('/api/v1/events/create', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(createEventOptions),
		});
		const jsonRes = await res.json();
		console.log(jsonRes, 'ova li');
	};

	return { createEvent, isLoading, error };
};
