import { createContext, useReducer } from 'react';
import { SET_EVENTS, CREATE_EVENT, DELETE_EVENT } from '../misc/actionTypes';

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
	switch (action.type) {
		case SET_EVENTS:
			return {
				events: action.payload,
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
	const [state, dispatch] = useReducer(eventsReducer, { events: null });

	return (
		<EventsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</EventsContext.Provider>
	);
};