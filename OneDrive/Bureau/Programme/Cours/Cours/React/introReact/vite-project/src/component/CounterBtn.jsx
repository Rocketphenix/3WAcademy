/* eslint-disable react/prop-types */
import { useState } from "react";
import CountErrorMsg from "./CounterErrorMsg";

const Counter = () => {
	const [counter, setCounter] = useState(0);
	const [isError, setIsError] = useState(false);

	const handleClick = (nbr, operation) => {
		if (operation === true) {
			setCounter(counter + nbr);
			setIsError(false);
		} else {
			if (counter > 0) {
				setCounter(counter - nbr);
				setIsError(false);
			} else {
				setIsError(true);
			}
		}
	};

	return (
		<>
			<button onClick={() => handleClick(2, true)}>Press + 2</button>
			<button onClick={() => handleClick(2, false)}>Press - 2</button>
			<p>{counter}</p>
			{isError && <CountErrorMsg />}
		</>
	);
};

export default Counter;
