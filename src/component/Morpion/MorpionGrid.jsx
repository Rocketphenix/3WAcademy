/* eslint-disable react/prop-types */
import { useMorpionContext } from "../../context/MorpionContext";

const MorpionGrid = ({ square, row, col }) => {
	const { dispatch } = useMorpionContext();

	const handleClick = () => {
		if (square === "") {
			dispatch({
				type: "playerAction",
				row,
				col,
			});
		}
	};

	return (
		<div className="square" onClick={handleClick}>
			{square}
		</div>
	);
};

export default MorpionGrid;
