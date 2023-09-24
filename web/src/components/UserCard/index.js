import { useState, useEffect, Fragment } from 'react';

import { useStorage } from '../../hooks/useStorage';

import noImage from '../../misc/no-event-image.jpg';

const UserCard = ({ singleUser }) => {
	const { downloadFile } = useStorage();
	const [image, setImage] = useState();

	useEffect(() => {
		downloadFile(singleUser.accountImage).then((file) => setImage(file));
	}, []);

	// console.log(singleUser);
	return (
		<Fragment>
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
				<div className='basic'>
					<h2 className='mb-10'>{singleUser.fullName}</h2>
					<div className='dateLocation'>
						<h3 className='ml-10'>{singleUser.email}</h3>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UserCard;
