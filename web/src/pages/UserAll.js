import { useEffect, useState, Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';

import noImage from '../misc/no-event-image.jpg';
// components
import UserNav from '../components/UserNav';

const UserAll = () => {
	// TODO: да поставам услов, само доколку е админ да може да ги листа сите корисници
	const [isDeleted, setIsDeleted] = useState();
	const [accountImages, setAccountImages] = useState({});

	const { allUsers, getAllAccounts, deleteAccount } = useAuth();
	const { downloadFile } = useStorage();

	useEffect(() => {
		setIsDeleted(false);
		getAllAccounts();
	}, [isDeleted]);

	useEffect(() => {
		allUsers &&
			allUsers.forEach((user) => {
				downloadFile(user.accountImage).then((image) => {
					setAccountImages((accounts) => ({
						...accounts,
						[user._id]: image,
					}));
				});
			});
	}, [allUsers]);

	const handleUpdate = async (id) => {
		console.log(id, 'OVA');
	};
	const handleDelete = (id) => {
		let isDeleted = deleteAccount(id);
		if (isDeleted) {
			setIsDeleted(true);
		}
	};
	// console.log(accountImages);
	return (
		<div>
			<UserNav title='Users' />
			{allUsers &&
				allUsers.map((singleUser) => {
					return (
						<div key={singleUser._id} className='singleUserEvents'>
							<div className='info'>
								<div className='imageContainer'>
									{!singleUser.accountImage ? (
										<img
											className='eventImage'
											src={noImage}
											alt='Tickets for events'
										/>
									) : (
										<Fragment>
											<img
												className='eventImage'
												src={accountImages[singleUser._id]}
												alt='Tickets for events'
											/>
										</Fragment>
									)}
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
		</div>
	);
};

export default UserAll;
