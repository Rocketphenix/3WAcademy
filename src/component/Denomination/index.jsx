import { useDispatch, useSelector } from "react-redux";
import {
	setAmount,
	calculateDenominations,
	reset,
} from "../../store/actions/denominationActions";
import {
	selectAmount,
	selectDenominations,
} from "../../store/selectors/denominationSelectors";
import Button from "../Button";
import Input from "../Input";

const Denomination = () => {
	const dispatch = useDispatch();
	const amount = useSelector(selectAmount);
	const denominations = useSelector(selectDenominations);

	return (
		<div>
			<Input
				value={amount}
				onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
			/>
			<Button onClick={() => dispatch(calculateDenominations())}>
				Dénomination
			</Button>
			<Button onClick={() => dispatch(reset())}>Reset</Button>

			<div>
				{denominations.map((denom, index) => (
					<p key={index}>
						Dénomination {denom.unit} unité(s) : {denom.count}
					</p>
				))}
			</div>
		</div>
	);
};

export default Denomination;
