/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useQuizzReducer from "../reducer/quizzReducer.jsx";

// Creation du context
const QuizzContext = createContext();

// Creation du provider grace au context
export const QuizzProvider = ({ children }) => {
	const [state, dispatch] = useQuizzReducer();

	return (
		<QuizzContext.Provider value={{ state, dispatch }}>
			{children}
		</QuizzContext.Provider>
	);
};

//Fonction utile permettant de consommer le context
const useQuizzContext = () => useContext(QuizzContext);

export { useQuizzContext };
