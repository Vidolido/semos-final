import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext';

import { SET_ALL_USERS, DELETE_USER } from '../misc/actionTypes';
import noImage from '../misc/no-event-image.jpg';
// components
import UserNav from '../components/UserNav';

const UserAll = () => {
	// TODO: да поставам услов, само доколку е админ да може да ги листа сите корисници
	const [isDeleted, setIsDeleted] = useState();
	const { user, allUsers, dispatch } = useAuthContext();
	useEffect(() => {
		setIsDeleted(false);

		const getEvents = async () => {
			const res = await fetch(`/api/v1/auth/`);
			const jsonRes = await res.json();
			let curentUser = jwt_decode(user.token).id;
			let restOfUsers = jsonRes.filter((user) => user._id !== curentUser);

			if (res.ok) {
				dispatch({ type: SET_ALL_USERS, payload: restOfUsers });
			}
		};
		getEvents();
	}, [dispatch, isDeleted, user]);
	const handleUpdate = async (id) => {
		console.log(jwt_decode(user.token), 'OVA');
	};
	const handleDelete = async (id) => {
		console.log(id, 'OVA');
		let deleteUser = await fetch(`/api/v1/auth//${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
			},
		});
		if (deleteUser.ok) {
			dispatch({ type: DELETE_USER, payload: id });
			setIsDeleted(true);
		}
	};
	return (
		<div>
			<UserNav title='Users' />
			{allUsers &&
				allUsers.map((singleUser) => {
					return (
						<div key={singleUser._id} className='singleUserEvents'>
							<div className='info'>
								<div className='imageContainer'>
									<img src={noImage} alt='' />
								</div>
								<div className='basic'>
									<h2 className='mb-10'>{singleUser.fullName}</h2>
									<div className='dateLocation'>
										<h3 className='ml-10'>{singleUser.email}</h3>
									</div>
								</div>
							</div>
							<div className='buttons flex gap-20'>
								<button
									onClick={() => handleUpdate(singleUser._id)}
									className='btn-purpleToWhite width-150'>
									Make Admin
								</button>
								<button
									onClick={() => handleDelete(singleUser._id)}
									className='btn-blackToTransparent width-150'>
									Delete User
								</button>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default UserAll;
