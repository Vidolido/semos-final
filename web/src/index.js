import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { EventsContextProvider } from './context/EventsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// TODO: Да ги сместам сите contextProvider-и во еден како во документацијата.
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<EventsContextProvider>
				<App />
			</EventsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
