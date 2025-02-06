/* eslint-disable react/prop-types */
import { useQuizzContext } from "../../context/QuizzContext";

const OptionQuizz = ({ option }) => {
	const { dispatch } = useQuizzContext();

	const answer = ({ option }) => {
		dispatch({
			type: "answer",
			answer: option,
		});
	};

	return (
		<>
			<button onClick={() => answer({ option })}>{option}</button>
		</>
	);
};

export default OptionQuizz;
