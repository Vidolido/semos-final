import { createContext, useReducer } from 'react';

import { DELETE_CART, REMOVE_FROM_CART, SET_CART } from '../misc/actionTypes';

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
		case REMOVE_FROM_CART:
			return {
				cart: {
					cartItems: state.cart.cartItems.filter(
						(item) => item.event._id !== action.payload
					),
				},
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
