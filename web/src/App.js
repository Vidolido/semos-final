import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<h1>Hello From TicketBlaster</h1>
			<div className='pages'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<h1>Signup Page</h1>} />
					<Route path='/category/:cat' element={<h1>Category Page</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
