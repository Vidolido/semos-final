import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { Fragment } from 'react';

const UserNav = ({ title }) => {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleClick = () => {
		logout();
	};
	let decodedUser = jwt_decode(user.token);
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
				{decodedUser.accountType === 'admin' ? (
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
