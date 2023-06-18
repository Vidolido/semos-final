import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import './App.css';
// components
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';
import TicketHisotry from './pages/TicketHisotry';
import UserDetails from './pages/UserDetails';

function App() {
	const { user } = useAuthContext();
	return (
		<BrowserRouter>
			<Navbar />
			<h1>Hello From TicketBlaster</h1>
			<div className='pages'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						path='/signin'
						element={!user ? <Signin /> : <Navigate to='/' />}
					/>
					<Route path='/category/:cat' element={<h1>Category Page</h1>} />
					<Route
						path='/user/cart'
						element={user ? <h1>Cart</h1> : <Navigate to='/' />}
					/>
					<Route
						path='/user/checkout'
						element={user ? <h1>Checkout</h1> : <Navigate to='/' />}
					/>
					<Route
						path='/user/thank-you'
						element={user ? <h1>Thank you</h1> : <Navigate to='/' />}
					/>
					<Route
						path='/user/details'
						element={user ? <UserDetails /> : <Navigate to='/login' />}
					/>
					<Route
						path='/user/ticket-history'
						element={user ? <TicketHisotry /> : <Navigate to='/login' />}
					/>
					{/* Да направам 404 рута */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
