import { createContext, useReducer } from 'react';
import {
	SET_EVENTS,
	SET_COMEDY_EVENTS,
	SET_MUSIC_EVENTS,
	SET_SINGLE_EVENT,
	SET_HERO_EVENT,
	CLEAR_STATE,
	CREATE_EVENT,
	DELETE_EVENT,
} from '../misc/actionTypes';

const initialState = {
	events: [],
	event: null,
	heroEvent: null,
	category: {
		comedy: [],
		music: [],
	},
};

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
	switch (action.type) {
		case SET_EVENTS:
			return {
				...state,
				events: action.payload,
			};
		case SET_HERO_EVENT:
			return {
				...state,
				heroEvent: action.payload,
			};
		case SET_COMEDY_EVENTS:
			return {
				...state,
				category: {
					...state.category,
					comedy: action.payload.length > 0 ? [...action.payload] : [],
				},
			};
		case SET_MUSIC_EVENTS:
			return {
				...state,
				category: {
					...state.category,
					music: action.payload.length > 0 ? [...action.payload] : [],
				},
			};
		case SET_SINGLE_EVENT:
			return {
				...state,
				event: action.payload,
			};
		case CREATE_EVENT:
			return {
				events: [action.payload, ...state.events],
			};
		case DELETE_EVENT:
			return {
				events: state.events.filter((event) => event._id !== action.payload.id),
			};
		case CLEAR_STATE:
			//TODO: Да чистам од state само тоа што треба.
			return {
				initialState,
			};
		default:
			return state;
	}
};

export const EventsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(eventsReducer, initialState);

	return (
		<EventsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</EventsContext.Provider>
	);
};
