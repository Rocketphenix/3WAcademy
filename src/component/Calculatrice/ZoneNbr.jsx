import "../../calculatrice.css";
import { useCalculateContext } from "../../context/CalculateContext";
import BtnCalc from "./BtnCalc.jsx";

const ZoneNbr = () => {
	const { state, dispatch } = useCalculateContext();
	const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

	const handleClick = (nbr) => {
		if (!state.asOperateur) {
			dispatch({
				type: "newNbr1",
				nbr: nbr,
			});
		} else {
			dispatch({
				type: "newNbr2",
				nbr: nbr,
			});
		}
	};

	return (
		<>
			<div className="zoneNbr">
				{numbers.map((num) => (
					<BtnCalc key={num} handleClick={() => handleClick(num)} info={num} />
				))}
			</div>
		</>
	);
};

export default ZoneNbr;
