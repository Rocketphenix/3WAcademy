import "../../calculatrice.css";
import ZoneNbr from "./ZoneNbr";
import ZoneOperator from "./ZoneOperator";
import BtnCalc from "./BtnCalc.jsx";
import { useCalculateContext } from "../../context/CalculateContext.jsx";

const Calculatrice = () => {
	// const [state, dispatch] = useReducer(reducer, initialState);
	const { state, dispatch } = useCalculateContext();

	const calcul = () => {
		dispatch({
			type: "calcul",
		});
	};
	const reset = () => {
		dispatch({
			type: "reset",
		});
	};

	return (
		<>
			<div className="calculatrice">
				<div className="calculatriceScreen">
					<span className="result">{state.result}</span>
					<span>{state.nbr1 || 0}</span>
					<span>{state.operateur}</span>
					<span>{state.nbr2}</span>
				</div>

				<ZoneNbr />
				<ZoneOperator />

				<div className="zoneValid">
					<BtnCalc handleClick={calcul} info="Enter" />
					<BtnCalc handleClick={reset} info="Reset" />
				</div>
			</div>
		</>
	);
};

export default Calculatrice;
