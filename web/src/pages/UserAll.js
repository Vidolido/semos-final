import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useStorage } from '../hooks/useStorage';

// import noImage from '../misc/no-event-image.jpg';
// components
import UserNav from '../components/UserNav';
import UserCard from '../components/UserCard';
import Modal from '../components/Modal';

const UserAll = () => {
	const initialModalState = {
		show: false,
		message: '',
		action: '',
		id: '',
	};
	// TODO: да поставам услов, само доколку е админ да може да ги листа сите корисници
	const [isDeleted, setIsDeleted] = useState();
	const [modalOptions, setModalOptions] = useState(initialModalState);

	const { allUsers, getAllAccounts } = useAuth();

	useEffect(() => {
		setIsDeleted(false);
		getAllAccounts();
	}, [isDeleted]);

	const handleUpdate = async (id, accountType) => {
		const message =
			accountType === 'admin'
				? 'You are about to downgrade a user from administrator.'
				: 'You are about to make a user administrator of the system.';
		setModalOptions(() => ({
			show: true,
			message,
			action: 'updateUser',
			button: 'Update User',
			id,
		}));
	};
	const handleDelete = (id) => {
		setModalOptions(() => ({
			show: true,
			message: 'You are about to delete a user from the system.',
			action: 'deleteUser',
			button: 'Delete User',
			id,
		}));
		// let isDeleted = deleteAccount(id);
		// if (isDeleted) {
		// 	setIsDeleted(true);
		// }
	};
	// console.log(accountImages);
	return (
		<div>
			<UserNav title='Users' />
			{allUsers &&
				allUsers.map((singleUser) => {
					return (
						<div key={singleUser._id} className='singleUserEvents'>
							<UserCard singleUser={singleUser} />
							<div className='buttons flex gap-20'>
								<button
									onClick={() =>
										handleUpdate(singleUser._id, singleUser.accountType)
									}
									className='btn-purpleToWhite width-150'>
									{singleUser.accountType === 'customer'
										? 'Make Admin'
										: 'Make Customer'}
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
			{modalOptions.show && (
				<Modal
					modalOptions={modalOptions}
					setModalOptions={setModalOptions}
					setIsDeleted={setIsDeleted}
				/>
			)}
		</div>
	);
};

export default UserAll;
