import { createContext, useReducer } from 'react';
import {
	SET_EVENTS,
	SET_COMEDY_EVENTS,
	SET_MUSIC_EVENTS,
	CREATE_EVENT,
	DELETE_EVENT,
} from '../misc/actionTypes';

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
	switch (action.type) {
		case SET_EVENTS:
			return {
				events: action.payload,
			};
		case SET_COMEDY_EVENTS:
			return {
				...state,
				category: {
					...state.category,
					comedy: [...action.payload],
				},
			};
		case SET_MUSIC_EVENTS:
			return {
				...state,
				category: {
					...state.category,
					music: [...action.payload],
				},
			};
		case CREATE_EVENT:
			return {
				events: [action.payload, ...state.events],
			};
		case DELETE_EVENT:
			return {
				events: state.events.filter(
					(event) => event._id !== action.payload._id
				),
			};
		default:
			return state;
	}
};

export const EventsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(eventsReducer, {
		events: [],
		category: {
			comedy: [],
			music: [],
		},
	});

	return (
		<EventsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</EventsContext.Provider>
	);
};
