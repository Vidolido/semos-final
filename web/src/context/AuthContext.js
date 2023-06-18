import { createContext, useReducer, useEffect } from 'react';
import { LOGIN, LOGOUT } from '../misc/actionTypes';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			return { user: action.payload };
		case LOGOUT:
			return { user: null };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	useEffect(() => {
		// Работи без разлика дали е добар токенот или не, доколку се поклопува името user-от е логиран. Да го поминам преку /validate рутата.
		const user = JSON.parse(localStorage.getItem('TicketBlasterUser')); // Проверуваме дали корисникот е веќе логиран.

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
