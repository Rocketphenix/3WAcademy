import { useCalculateContext } from "../../context/CalculateContext";
import BtnCalc from "./BtnCalc.jsx";

const ZoneOperator = () => {
	const { dispatch } = useCalculateContext();

	const handleClick = (operator) => {
		dispatch({
			type: "operateur",
			operateur: operator,
		});
	};

	return (
		<>
			<div className="zoneNbr">
				<BtnCalc handleClick={() => handleClick("+")} info="+" />
				<BtnCalc handleClick={() => handleClick("-")} info="-" />
				<BtnCalc handleClick={() => handleClick("*")} info="*" />
			</div>
		</>
	);
};

export default ZoneOperator;
