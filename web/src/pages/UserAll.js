import { useEffect, useState, Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useStorage } from '../hooks/useStorage';

import noImage from '../misc/no-event-image.jpg';
// components
import UserNav from '../components/UserNav';

const UserAll = () => {
	// TODO: да поставам услов, само доколку е админ да може да ги листа сите корисници
	const [isDeleted, setIsDeleted] = useState();
	const [image, setImage] = useState(null);

	const { allUsers, getAllAccounts, deleteAccount } = useAuth();
	const { downloadFile } = useStorage();

	useEffect(() => {
		setIsDeleted(false);
		getAllAccounts();
	}, [isDeleted]);

	useEffect(() => {
		// downloadFile(event.eventImage).then((file) => setImage(file));
	}, []);

	const handleUpdate = async (id) => {
		console.log(id, 'OVA');
	};
	const handleDelete = (id) => {
		let isDeleted = deleteAccount(id);
		if (isDeleted) {
			setIsDeleted(true);
		}
	};
	console.log(allUsers);
	return (
		<div>
			<UserNav title='Users' />
			{allUsers &&
				allUsers.map((singleUser) => {
					{
						/* let image = '';
					downloadFile(singleUser.userImage).then((file) => (image = file)); */
					}

					return (
						<div key={singleUser._id} className='singleUserEvents'>
							<div className='info'>
								<div className='imageContainer'>
									{!image ? (
										<img
											className='eventImage'
											src={noImage}
											alt='Tickets for events'
										/>
									) : (
										<Fragment>
											<img
												className='eventImage'
												src={image}
												alt='Tickets for events'
											/>
										</Fragment>
									)}
								</div>
								{/* <div className='imageContainer'>
									<img src={noImage} alt='' />
								</div> */}
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
