import { createContext, useReducer } from 'react';

// Тука ќе импортирам actionTypes

export const CartContext = createContext();

export const cartReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CART':
			return {
				cart: action.payload,
			};
		default:
			return state;
	}
};

export const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { cart: null });

	return (
		<CartContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
