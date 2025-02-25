import { useDispatch } from "react-redux";
import { setDenominations } from "../../store/actions/denominationActions";
import "./style.scss";

const denominationsList = [
	[100, 50, 20, 10, 5, 1],
	[50, 30, 20, 10, 5, 2, 1],
	[100, 50, 40, 30, 20, 10, 1],
];

const SettingsPage = () => {
	const dispatch = useDispatch();

	const handleSelectionChange = (denom) => {
		dispatch(setDenominations(denom));
	};

	return (
		<div className="settings-container">
			<h1>Choisissez une dénomination</h1>
			<div className="option-container">
				{denominationsList.map((denom, index) => (
					<label key={index} className="label">
						<input
							type="radio"
							name="denomination"
							onChange={() => handleSelectionChange(denom)}
							className="input"
						/>
						{denom.join(", ")}
					</label>
				))}
			</div>
		</div>
	);
};

export default SettingsPage;
