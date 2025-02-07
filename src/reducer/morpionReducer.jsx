import { useReducer } from "react";

const initialState = {
	grid: [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	],
	playerActif: 0,
	resultats: [
		{ player: "X", score: 0 },
		{ player: "O", score: 0 },
	],
	historic: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		// Lorsque le joueur click sur une case
		case "playerAction": {
			// On vérifie que la case est vide
			if (state.grid[action.row][action.col] === "") {
				// Il faut crée une nouvelle grid qui correspond a la grid
				// mais avec le nouveau point que l'on assignera a la fin la state.grid
				let newGrid = state.grid.map((row) => [...row]);
				const playerSymbol = state.playerActif === 0 ? "X" : "O";
				newGrid[action.row][action.col] = playerSymbol;

				let newHistoric = [...state.historic]; // même chose pour l'historique
				// Créer une nouvelle partie si nécessaire ou lui assigner le nouveau mouvement
				if (
					newHistoric.length === 0 ||
					newHistoric[newHistoric.length - 1].winner !== null
				) {
					newHistoric.push({ moves: [], winner: null });
				}

				// On vérifie que l'on ne double pas l'action dans l'historic
				const lastGame = newHistoric[newHistoric.length - 1]; // Récupére la partie Précédente
				const lastMove = lastGame.moves[lastGame.moves.length - 1]; // Récupére le move Précédent

				if (
					!lastMove ||
					lastMove.row !== action.row ||
					lastMove.col !== action.col
				) {
					// Si l'action et bien différente de la précédente on rajoute a l'historiuqe l'action
					lastGame.moves.push({
						player: playerSymbol,
						row: action.row,
						col: action.col,
					});
				}

				// On met a jour le état du jeu (le state)
				return {
					...state,
					playerActif: state.playerActif === 0 ? 1 : 0,
					grid: newGrid,
					historic: newHistoric,
				};
			}
			return state;
		}

		// En cas de Victoire on donne un point au joueur gagnant et remet a zero le plateau
		case "victory": {
			const newScores = state.resultats.map((player) =>
				player.player === action.winner
					? { ...player, score: player.score + 1 }
					: player
			);

			let newHistoric = [...state.historic];

			if (newHistoric.length > 0) {
				newHistoric[newHistoric.length - 1].winner = action.winner;
			}

			return {
				...state,
				resultats: newScores,
				grid: [
					["", "", ""],
					["", "", ""],
					["", "", ""],
				],
				playerActif: 0,
				historic: newHistoric,
			};
		}

		// En cas d'égalité on remet le tableau a zero
		case "draw": {
			let newHistoric = [...state.historic];

			if (newHistoric.length > 0) {
				newHistoric[newHistoric.length - 1].winner = "draw";
			}

			return {
				...state,
				grid: [
					["", "", ""],
					["", "", ""],
					["", "", ""],
				],
				playerActif: 0,
				historic: newHistoric,
			};
		}

		// Remet tout les informations stoquer dans le localStorage dans le state
		case "loadGameData": {
			return {
				...state,
				historic: action.payload.historic,
				grid: action.payload.grid,
				resultats: action.payload.scores,
			};
		}

		default:
			return state;
	}
};

const useMorpionReducer = () => useReducer(reducer, initialState);

export default useMorpionReducer;
