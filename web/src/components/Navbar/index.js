import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
// import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
	const { logout } = useLogout();
	// const { user } = useAuthContext();

	const handleClick = () => {
		logout();
	};
	return (
		<nav className='navbar'>
			<div className='navbarLeft'>
				<div className='logoContainer'>
					<Link to='/'>
						<h1>TicketBlaster</h1>
					</Link>
				</div>
				<div className='menuContainer'>
					<Link to='/category/music'>Musical Concerts</Link>
					<Link to='/category/comedy'>Stand-up Comedy</Link>
				</div>
			</div>
			<div className='navbarRight'>
				<div className='searchBar'>
					<input type='text' placeholder='Search' />
				</div>
				<div className='userMenu'>
					{/* TODO: Тука да направам услов, корисникот е логиран или не */}
					{/* Не логиран корисник */}
					<Link to='/login'>Log in</Link>
					<Link to='/signin'>Create Account</Link>
					{/* Логиран корисник */}
					<button onClick={handleClick}>Log out</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
