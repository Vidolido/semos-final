import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as AccountIcon } from '../../misc/account.svg';
import { ReactComponent as CartIcon } from '../../misc/cart.svg';

const Navbar = () => {
	const { user } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (e.key === 'Enter') {
			navigate(`/search/${e.target.value}`);
		}
	};
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
					<input type='text' placeholder='Search' onKeyUp={handleSubmit} />
				</div>
				<div className='userMenu'>
					{!user && (
						<Fragment>
							<Link className='navLinks' to='/login'>
								Log in
							</Link>
							<Link className='navLinks' to='/signin'>
								Create Account
							</Link>
						</Fragment>
					)}
					{user && (
						<Fragment>
							<Link className='iconLinks' to='/user/cart'>
								<CartIcon />
							</Link>
							<Link className='iconLinks' to='/user/ticket-history'>
								<AccountIcon />
							</Link>
						</Fragment>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
