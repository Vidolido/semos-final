import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

const UserNav = ({ title }) => {
	const { logout } = useLogout();

	const handleClick = () => {
		logout();
	};
	return (
		<div className='userNav'>
			<h1 className='heading'>{title}</h1>
			<nav>
				<Link to='/user/ticket-history'>Ticket History</Link>
				<Link to='/user/details'>User Details</Link>
				<button onClick={handleClick}>Log out</button>
			</nav>
		</div>
	);
};

export default UserNav;
