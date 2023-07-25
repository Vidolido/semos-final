import { createContext, useReducer } from 'react';

import { DELETE_CART, SET_CART } from '../misc/actionTypes';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
	switch (action.type) {
		case SET_CART:
			return {
				cart: action.payload,
			};
		case DELETE_CART:
			return {
				cart: null,
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
