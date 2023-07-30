import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import noImage from '../misc/no-event-image.jpg';
// components
import UserNav from '../components/UserNav';

const UserAll = () => {
	// TODO: да поставам услов, само доколку е админ да може да ги листа сите корисници
	const [isDeleted, setIsDeleted] = useState();
	const { allUsers, getAllAccounts, deleteAccount } = useAuth();

	useEffect(() => {
		setIsDeleted(false);
		getAllAccounts();
	}, [isDeleted]);

	const handleUpdate = async (id) => {
		console.log(id, 'OVA');
	};
	const handleDelete = (id) => {
		let isDeleted = deleteAccount(id);
		if (isDeleted) {
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
