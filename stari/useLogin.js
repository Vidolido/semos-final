import { useState } from 'react';
import { useAuthContext } from '../web/src/hooks/useAuthContext';
import { LOGIN } from '../web/src/misc/actionTypes';

export const useLogin = () => {
	//TODO: да исхендлам грешки при конекција
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const jsonRes = await res.json();
		// console.log(jsonRes.errors);

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

	return { login, isLoading, error };
};
