import { useReducer } from "react";

const initialState = {
	result: 0,
	nbr1: "",
	nbr2: "",
	operateur: "",
	asOperateur: false,
	error: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "newNbr1":
			return {
				...state,
				nbr1: state.nbr1 + action.nbr,
			};

		case "newNbr2":
			return {
				...state,
				nbr2: state.nbr2 + action.nbr,
			};

		case "operateur":
			return {
				...state,
				operateur: action.operateur,
				asOperateur: true,
			};

		case "calcul":
			{
				if (state.nbr1 === "") {
					state.nbr1 = 0;
				}
				if (state.nbr2 === "") {
					state.nbr2 = 0;
				}
			}
			switch (state.operateur) {
				case "+":
					return {
						...state,
						result: parseInt(state.nbr1) + parseInt(state.nbr2),
					};
				case "-":
					return {
						...state,
						result: parseInt(state.nbr1) - parseInt(state.nbr2),
					};
				case "*":
					return {
						...state,
						result: parseInt(state.nbr1) * parseInt(state.nbr2),
					};
				default:
					return {
						...state,
						result: state.result,
					};
			}
		case "reset":
			return {
				...state,
				result: 0,
				nbr1: "",
				nbr2: "",
				operateur: "",
				asOperateur: false,
				error: "",
			};

		default:
			return state;
	}
};

const useCalculateReducer = () => useReducer(reducer, initialState);

export default useCalculateReducer;
