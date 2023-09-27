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

	const forgotPassword = async (email) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/forgoth-password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		const jsonRes = await res.json();
		console.log('itRan', jsonRes);

		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			setIsLoading(false);
			setError(null);

			return jsonRes;
		}
	};

	const resetPassword = async (token, password, confirmPassword) => {
		setIsLoading(true);
		setError(null);

		const res = await fetch(`/api/v1/auth/reset-password/${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, confirmPassword }),
		});

		const jsonRes = await res.json();
		console.log(jsonRes);
		if (!res.ok) {
			setIsLoading(false);
			setError(jsonRes.errors);
		}
		if (res.ok) {
			setIsLoading(false);
			setError(null);

			return jsonRes;
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

		// console.log(jsonRes);
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
	// const getCurentUser = async () => {};

	const getUserDetails = async () => {
		setIsLoading(true);
		setError(null);

		const res = await fetch('/api/v1/auth/get-user-details', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		const jsonRes = await res.json();

		// console.log(res, jsonRes);
		if (res.ok) return jsonRes;
	};

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
		if (updateOptions.accountImage) {
			let fileName = await uploadFile(updateOptions.accountImage);
			updateOptions.accountImage = fileName;
		}
		// console.log(updateOptions);

		// let filteredOptions = Object.fromEntries(
		// 	Object.entries(updateOptions).filter(([_, v]) => v !== '')
		// );
		// console.log(filteredOptions);
		const res = await fetch('/api/v1/auth/updateAccount', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateOptions),
		});
		// console.log(updateOptions);
		const jsonRes = await res.json();

		if (res.ok) {
			setError(null);
		}
		if (!res.ok) {
			// console.log(res, jsonRes.errors);
			setError(jsonRes.errors);
			// console.log();
		}
	};

	const changeAccountType = async (id) => {
		setIsLoading(true);

		console.log(id);
		const res = await fetch('/api/v1/auth/changeAccountType', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		});

		const jsonRes = await res.json();

		// console.log(res, jsonRes, 'OVIE');
		if (!res.ok) {
			// console.log(res, jsonRes.errors);
			setIsLoading(false);
			setError(jsonRes.errors);
			// console.log();
			return false;
		}
		if (res.ok) {
			setError(null);
			setIsLoading(false);
			return true;
		}
	};

	const getAccountType = async () => {
		const res = await fetch('/api/v1/auth/get-account-type', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});

		const jsonRes = await res.json();
		return jsonRes.accountType;
	};

	return {
		signIn,
		login,
		logout,
		forgotPassword,
		resetPassword,
		getAllAccounts,
		deleteAccount,
		changeAccountType,
		updateAccount,
		getAccountType,
		getUserDetails,
		user,
		allUsers,
		isLoading,
		error,
	};
};
