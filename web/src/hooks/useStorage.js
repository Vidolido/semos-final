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
			const jsonRes = await res.json();
			// console.log(res, jsonRes.fileName);
			return jsonRes.fileName;
		} catch (err) {
			console.log(err);
		}
	};

	return { uploadFile, isLoading, error };
};
