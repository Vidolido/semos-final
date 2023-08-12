import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useStorage } from './useStorage';

import { DELETE_USER, LOGIN, LOGOUT, SET_ALL_USERS } from '../misc/actionTypes';
export const useAuth = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user, allUsers, dispatch } = useAuthContext();
	const { uploadFile } = useStorage();

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
			setError(null); // ova go dodadov posledno
		}
	};

	const getAllAccounts = async () => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		const jsonRes = await res.json();

		console.log(jsonRes);
		if (res.ok) {
			setIsLoading(false);
			setError(null);

			dispatch({ type: SET_ALL_USERS, payload: jsonRes });
		}

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.erros);
		}
	};

	// DA JA PISHAM
	const getCurentUser = async () => {};

	const logout = () => {
		localStorage.removeItem('TicketBlasterUser');
		// го бришеме корисникот од AuthContext
		// TODO: да проверам дали треба уште нешто да исчистам од state-от после logout
		dispatch({ type: LOGOUT });
	};

	const deleteAccount = async (id) => {
		setIsLoading(true);
		setError(null);

		let res = await fetch(`/api/v1/auth/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});
		if (res.ok) {
			setIsLoading(false);
			setError(null);

			dispatch({ type: DELETE_USER, payload: id });
			return true;
		}
		if (!res.ok) {
			setIsLoading(false);
			// setError(null); // kakvi errori?
			return false;
		}
	};

	const updateAccount = async (updateOptions) => {
		console.log('It Ran');
		console.log(updateOptions);
	};

	const getAccountType = async () => {
		const res = await fetch('/api/v1/auth/getAccountType', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		const jsonRes = res.json();
		console.log(jsonRes);
	};

	return {
		signIn,
		login,
		logout,
		getAllAccounts,
		getCurentUser,
		deleteAccount,
		updateAccount,
		getAccountType,
		user,
		allUsers,
		isLoading,
		error,
	};
};
