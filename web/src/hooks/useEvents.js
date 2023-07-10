import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';
import { CREATE_EVENT } from '../misc/actionTypes';

export const useEvents = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();
	const { dispatch } = useEventsContext();

	const createEvent = async (createEventOptions) => {
		setIsLoading(true);
		setError(null);
		console.log(user.token, 'from useCreateEvent hook');
		// const test = await(fetch('/api/v1/storage', {
		//     method: 'POST',
		//     headers: {
		// 		Authorization: `Bearer ${user.token}`,
		// 		'Content-Type': 'application/json',
		// 	},
		// }))
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
		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			dispatch({ type: CREATE_EVENT, payload: jsonRes });
			setIsLoading(false);
		}
	};

	const deleteEvent = async () => {
		setIsLoading(true);
		setError(null);
	};

	return { createEvent, deleteEvent, isLoading, error };
};