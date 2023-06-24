import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ReactComponent as Logo } from './logo.svg';

const Navbar = () => {
	const { user } = useAuthContext();

	return (
		<nav className='navbar'>
			<div className='navbarLeft'>
				<div className='logoContainer'>
					<Link to='/'>
						<Logo />
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
					{!user && (
						<Fragment>
							<Link to='/login'>Log in</Link>
							<Link to='/signin'>Create Account</Link>
						</Fragment>
					)}
					{/* Логиран корисник */}
					{user && (
						<Fragment>
							<Link to='/user/cart'>Cart</Link>
							<Link to='/user/ticket-history'>Account</Link>
						</Fragment>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
