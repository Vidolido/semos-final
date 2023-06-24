import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

const UserNav = ({ title }) => {
	const { logout } = useLogout();

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
				<Link to='/user/events'>Events</Link>
				<Link to='/user/all-users'>Users</Link>
				<Link to='/user/ticket-history'>Ticket History</Link>
				<Link to='/user/details'>User Details</Link>
				<button onClick={handleClick}>Log out</button>
			</nav>
		</div>
	);
};

export default UserNav;
