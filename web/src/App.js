import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';

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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
