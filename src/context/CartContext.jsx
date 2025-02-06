/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useCartReducer from "../reducer/CartReducer.jsx";

// Creation du context
const CartContext = createContext();

// Creation du provider grace au context
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useCartReducer();

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

//Fonction utile permettant de consommer le context
const useCartContext = () => useContext(CartContext);

export { useCartContext };
