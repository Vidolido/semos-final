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
		const user = JSON.parse(localStorage.getItem('user')); // Да го крстам ова поле типично за оваа апликација.

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
