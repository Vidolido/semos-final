import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthContext } from './hooks/useAuthContext';
import { useAuth } from './hooks/useAuth';

import './App.css';
// components
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Search from './pages/Search';
import TicketHisotry from './pages/TicketHisotry';
import UserDetails from './pages/UserDetails';
import Category from './pages/Category';
import About from './pages/About';
import UserEvents from './pages/UserEvents';
import UserAll from './pages/UserAll';
import CreateEvent from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import ShoppingCart from './pages/ShoppingCart';
import CheckOut from './pages/CheckOut';
import ThankYou from './pages/ThankYou';

function App() {
	const { user } = useAuth(); // da go smenam

	return (
		<BrowserRouter>
			<Navbar />
			<div className='pages'>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route
						path='/search/'
						element={<Search /> /** ova da go popravam */}
					/>
					<Route path='/search/:searchTerm' element={<Search />} />
					<Route path='/events/about/:id' element={<About />} />
					<Route path='/category/:cat' element={<Category />} />
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						path='/signin'
						element={!user ? <Signin /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/cart'
						element={user ? <ShoppingCart /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/cart/checkout'
						element={user ? <CheckOut /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/cart/thank-you'
						element={user ? <ThankYou /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/events'
						element={user ? <UserEvents /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/all-users'
						element={user ? <UserAll /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/create-event'
						element={user ? <CreateEvent /> : <Navigate to='/' />}
					/>
					<Route
						path='/user/update-event/:id'
						element={user ? <UpdateEvent /> : <Navigate to='/' />}
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
