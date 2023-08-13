import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { Fragment } from 'react';

const UserNav = ({ title }) => {
	const [accountType, setAccountType] = useState();
	const { getAccountType, logout } = useAuth();

	useEffect(() => {
		getAccountType().then((type) => setAccountType(type));
	}, []);

	const handleClick = () => {
		logout();
	};
	return (
		<div className='userNav'>
			<div className='headings'>
				<h1 className='heading'>{title}</h1>
				{title === 'Events' ? (
					<Link className='btn-purpleToWhite' to='/user/create-event'>
						Create Event
					</Link>
				) : (
					''
				)}
			</div>
			<nav>
				{accountType === 'admin' ? (
					<Fragment>
						<Link to='/user/events'>Events</Link>
						<Link to='/user/all-users'>Users</Link>
					</Fragment>
				) : (
					''
				)}

				<Link to='/user/ticket-history'>Ticket History</Link>
				<Link to='/user/details'>User Details</Link>
				<button onClick={handleClick}>Log out</button>
			</nav>
		</div>
	);
};

export default UserNav;
