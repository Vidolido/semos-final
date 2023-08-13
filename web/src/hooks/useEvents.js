import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';
import { useStorage } from './useStorage';
import {
	CREATE_EVENT,
	SET_SINGLE_EVENT,
	SET_HERO_EVENT,
	SET_COMEDY_EVENTS,
	SET_MUSIC_EVENTS,
	SET_EVENTS,
	DELETE_EVENT,
	CLEAR_STATE,
	CLEAR_HERO_EVENT,
} from '../misc/actionTypes';

export const useEvents = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();
	const { event, heroEvent, events, category, dispatch } = useEventsContext();
	const { uploadFile } = useStorage();

	const getEvents = async () => {
		setIsLoading(true);
		setError(null);
		// console.log(user);
		const res = await fetch('/api/v1/events/user-events', {
			method: 'POST',
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
			dispatch({ type: SET_EVENTS, payload: jsonRes });
		}
	};

	const getEventsByCategory = async (cat) => {
		setIsLoading(true);
		setError(null);

		let actionType = cat === 'comedy' ? SET_COMEDY_EVENTS : SET_MUSIC_EVENTS;

		const res = await fetch(`/api/v1/events/${cat}`);

		const jsonRes = await res.json();
		// console.log(res, jsonRes);

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		if (res.ok && !jsonRes.message) {
			dispatch({ type: actionType, payload: jsonRes });
		}
	};

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

	const getHero = async () => {
		setIsLoading(true);
		setError(null);
		dispatch({ type: CLEAR_HERO_EVENT });

		const res = await fetch('/api/v1/events/get-hero');

		const jsonRes = await res.json();
		// console.log(res, jsonRes);

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		if (res.ok) {
			setIsLoading(false);
			setError(null);
			dispatch({ type: SET_HERO_EVENT, payload: jsonRes });
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

	const searchEvents = async (searchTerm) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/events/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				searchTerm,
			}),
		});

		const jsonRes = await res.json();
		if (res.ok) {
			setIsLoading(false);
			setError(null);
			return jsonRes;
		}
		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}

		console.log(searchTerm, 'searchterm');
		console.log(res, 'res');
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
		// console.log(jsonRes, 'ova li');
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

	const deleteEvent = async (id) => {
		setIsLoading(true);
		setError(null);

		let res = await fetch(`/api/v1/events/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			dispatch({ type: DELETE_EVENT, payload: id });
			return true;
		}
	};

	return {
		getEvents,
		getEventsByCategory,
		getHero,
		getSingleEvent,
		searchEvents,
		createEvent,
		getRelatedEvents,
		deleteEvent,
		event,
		heroEvent,
		events,
		category,
		dispatch,
		isLoading,
		error,
	};
};
