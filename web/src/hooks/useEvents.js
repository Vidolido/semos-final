import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';
import { useStorage } from './useStorage';
import {
	CREATE_EVENT,
	SET_SINGLE_EVENT,
	CLEAR_STATE,
} from '../misc/actionTypes';

export const useEvents = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();
	const { event, events, category, dispatch } = useEventsContext();
	const { uploadFile } = useStorage();

	const getSingleEvent = async (id) => {
		setIsLoading(true);
		setError(null);
		dispatch({ type: CLEAR_STATE });

		const res = await fetch(`/api/v1/events/single-event`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: id }),
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		if (res.ok) {
			dispatch({ type: SET_SINGLE_EVENT, payload: jsonRes });
			setIsLoading(false);
			setError(null);
			// return jsonRes;
		}
	};

	const createEvent = async (createEventOptions) => {
		setIsLoading(true);
		setError(null);

		let optionIsEmpty = Object.entries(createEventOptions).some((option) =>
			!option[1] && option[0] !== 'adminId' ? true : false
		);

		if (!optionIsEmpty) {
			let fileName = await uploadFile(createEventOptions.eventImage);
			createEventOptions.eventImage = fileName;
		} else if (optionIsEmpty) {
			createEventOptions.eventImage = '';
		}

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
			return false;
		}
		if (res.ok) {
			dispatch({ type: CREATE_EVENT, payload: jsonRes });
			setIsLoading(false);
			setError(null);
			return true;
		}
	};

	const getRelatedEvents = async (rE) => {
		setIsLoading(true);
		const res = await fetch('/api/v1/events/related', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(rE),
		});
		const jsonRes = await res.json();
		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			setIsLoading(false);
		}
		return jsonRes;
	};

	const deleteEvent = async () => {
		setIsLoading(true);
		setError(null);
	};

	return {
		getSingleEvent,
		createEvent,
		getRelatedEvents,
		deleteEvent,
		event,
		events,
		category,
		dispatch,
		isLoading,
		error,
	};
};
