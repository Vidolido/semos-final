import { createContext, useReducer, useEffect } from 'react';
import { LOGIN, LOGOUT, SET_ALL_USERS } from '../misc/actionTypes';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case SET_ALL_USERS:
			return {
				...state,
				allUsers: [...action.payload],
			};
		case LOGIN:
			return { user: action.payload };
		case LOGOUT:
			return { user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		allUsers: [],
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('TicketBlasterUser')); // Проверуваме дали корисникот е веќе логиран.
		// Тука треба верификација на токен
		if (user) {
			dispatch({ type: LOGIN, payload: user });
		}
	}, []);

	console.log('AuthContext state: ', state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
