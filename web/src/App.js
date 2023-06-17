import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<h1>Hello From TicketBlaster</h1>
			<div className='pages'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signin />} />
					<Route path='/category/:cat' element={<h1>Category Page</h1>} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
