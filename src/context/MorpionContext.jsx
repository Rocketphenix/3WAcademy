/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useMorpionReducer from "../reducer/morpionReducer.jsx";

// Creation du context
const MorpionContext = createContext();

// Creation du provider grace au context
export const MorpionProvider = ({ children }) => {
	const [state, dispatch] = useMorpionReducer();

	return (
		<MorpionContext.Provider value={{ state, dispatch }}>
			{children}
		</MorpionContext.Provider>
	);
};

//Fonction utile permettant de consommer le context
const useMorpionContext = () => useContext(MorpionContext);

export { useMorpionContext };
