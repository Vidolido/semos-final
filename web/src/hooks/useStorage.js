import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useStorage = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { user } = useAuthContext();

	const uploadFile = async (image) => {
		setIsLoading(true);
		setError(null);
		// console.log(image, 'uploadFile: gore');
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await fetch('/api/v1/storage/upload', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
				body: formData,
			});

			if (res.ok) {
				setIsLoading(false);
				setError(null);
				const jsonRes = await res.json();
				// console.log(jsonRes);
				return jsonRes.fileName;
			}
			// console.log(res, 'OVAJ');
			// console.log(res, jsonRes.fileName);
		} catch (err) {
			console.log(err);
			setError(err);
		}
	};

	const downloadFile = async (fileName) => {
		setIsLoading(true);
		setError(null);
		const res = await fetch(`/api/v1/storage/download/${fileName}`);
		if (!res.ok) {
			setError({ message: 'Something went wrong.' });
		}
		if (res.ok) {
			// console.log(res.url);
			return res.url;
		}
	};

	return { uploadFile, downloadFile, isLoading, error };
};
