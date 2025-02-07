import { useMorpionContext } from "../../context/MorpionContext.jsx";

const Historic = () => {
	const { state } = useMorpionContext();

	return (
		<>
			<div className="historic">
				{state.historic.map((game, i) => (
					<div className="game" key={i}>
						<h3>
							Partie {i + 1}{" "}
							{game.winner &&
								`- Gagnant: ${
									game.winner === "draw" ? "Match nul" : game.winner
								}`}
						</h3>
						{game.moves.map((move, j) => (
							<div key={j}>
								Joueur {move.player} → Ligne {move.row + 1}, Colonne{" "}
								{move.col + 1}
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
};

export default Historic;
