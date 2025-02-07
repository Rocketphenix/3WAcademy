import { useEffect } from "react";
import { useMorpionContext } from "../../context/MorpionContext.jsx";
import "../../morpion.css";
import GameBoard from "./GameBoard.jsx";
import Historic from "./Historic.jsx";
import Header from "./Header.jsx";

const Morpion = () => {
	const { state, dispatch } = useMorpionContext();

	// Charger l'historique, la grille et les scores depuis localStorage au démarrage
	useEffect(() => {
		const storedHistoric = localStorage.getItem("historic");
		const storedGrid = localStorage.getItem("grid");
		const storedScores = localStorage.getItem("scores");

		// Créer un objet avec toutes les données chargées depuis localStorage
		const loadedData = {
			historic: storedHistoric ? JSON.parse(storedHistoric) : [],
			grid: storedGrid
				? JSON.parse(storedGrid)
				: [
						["", "", ""],
						["", "", ""],
						["", "", ""],
				  ],
			scores: storedScores
				? JSON.parse(storedScores)
				: [
						{ player: "X", score: 0 },
						{ player: "O", score: 0 },
				  ],
		};

		// Dispatch une seule action pour charger toutes les données
		dispatch({
			type: "loadGameData",
			payload: loadedData,
		});
	}, [dispatch]);

	// Sauvegarder l'historique, la grille et les scores dans localStorage chaque fois qu'il change
	useEffect(() => {
		if (
			state.historic.length > 0 ||
			state.grid.some((row) => row.some((cell) => cell !== "")) ||
			state.resultats.some((player) => player.score !== 0)
		) {
			localStorage.setItem("historic", JSON.stringify(state.historic));
			localStorage.setItem("grid", JSON.stringify(state.grid));
			localStorage.setItem("scores", JSON.stringify(state.resultats));
		}
	}, [state.historic, state.grid, state.resultats]);

	return (
		<>
			{state.historic.length > 0 && <Historic />}

			<Header />
			<GameBoard />
			<div className="scoreboard">
				<h2>Scores</h2>
				<p>Joueur X : {state.resultats[0].score}</p>
				<p>Joueur O : {state.resultats[1].score}</p>
			</div>
		</>
	);
};

export default Morpion;
