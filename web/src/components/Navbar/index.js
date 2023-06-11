import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
					<Link to='/login'>Log in</Link>
					<Link to='/signup'>Create Account</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
