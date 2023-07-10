import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { LOGIN, LOGOUT } from '../misc/actionTypes';
export const useAuth = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const signIn = async (fullName, email, password, confirmPassword) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fullName, email, password, confirmPassword }),
		});

		const jsonRes = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			localStorage.setItem('TicketBlasterUser', JSON.stringify(jsonRes));

			dispatch({ type: LOGIN, payload: jsonRes });

			setIsLoading(false);
		}
	};

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const jsonRes = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			localStorage.setItem('TicketBlasterUser', JSON.stringify(jsonRes));

			dispatch({ type: LOGIN, payload: jsonRes });

			setIsLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('TicketBlasterUser');
		// го бришеме корисникот од AuthContext
		// TODO: да проверам дали треба уште нешто да исчистам од state-от после logout
		dispatch({ type: LOGOUT });
	};

	return { signIn, login, logout, isLoading, error };
};
