import { useEffect } from "react";
import { useMorpionContext } from "../../context/MorpionContext";
import MorpionGrid from "./MorpionGrid.jsx";

const GameBoard = () => {
	const { state, dispatch } = useMorpionContext();

	// Logique de la victoire ou du match nul
	useEffect(() => {
		let isOver = false;

		for (let i = 0; i < 3; i++) {
			// Vérifie les lignes
			if (
				state.grid[i][0] &&
				state.grid[i][0] === state.grid[i][1] &&
				state.grid[i][0] === state.grid[i][2]
			) {
				isOver = true;
				dispatch({ type: "victory", winner: state.grid[i][0] });
				return;
			}

			// Vérifie les colonnes
			if (
				state.grid[0][i] &&
				state.grid[0][i] === state.grid[1][i] &&
				state.grid[0][i] === state.grid[2][i]
			) {
				isOver = true;
				dispatch({ type: "victory", winner: state.grid[0][i] });
				return;
			}
		}

		// Vérifie les diagonales
		if (
			state.grid[0][0] &&
			state.grid[0][0] === state.grid[1][1] &&
			state.grid[0][0] === state.grid[2][2]
		) {
			isOver = true;
			dispatch({ type: "victory", winner: state.grid[0][0] });
			return;
		}

		if (
			state.grid[0][2] &&
			state.grid[0][2] === state.grid[1][1] &&
			state.grid[0][2] === state.grid[2][0]
		) {
			isOver = true;
			dispatch({ type: "victory", winner: state.grid[0][2] });
			return;
		}

		// Vérification du match nul
		if (!isOver && state.grid.flat().every((cell) => cell !== "")) {
			dispatch({ type: "draw" });
		}
	}, [state.grid]);

	return (
		<>
			<div className="gameBoard">
				{state.grid.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((square, colIndex) => (
							<MorpionGrid
								key={colIndex}
								square={square}
								row={rowIndex}
								col={colIndex}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default GameBoard;
