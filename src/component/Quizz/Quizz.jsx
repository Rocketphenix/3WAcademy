import { useEffect, useRef } from "react";
import { useQuizzContext } from "../../context/QuizzContext";
import OptionQuizz from "./OptionQuizz";

const Quizz = () => {
	const { state, dispatch } = useQuizzContext();
	const firstQuestion = state.questions[state.currentQuestion];

	const timer = useRef(null);

	useEffect(() => {
		// Lancer le timer si le temps n'est pas écoulé
		if (state.timeLeft > 0) {
			timer.current = setInterval(() => {
				dispatch({ type: "tick" });
			}, 1000);
		} else {
			// Temps écoulé, on passe à la question suivante
			dispatch({
				type: "answer",
				answer: "",
			});
		}

		// Nettoyage du timer quand le composant est démonté ou mis à jour
		return () => {
			clearInterval(timer.current);
		};
	}, [state.timeLeft]);

	const restartQuizz = () => {
		dispatch({
			type: "reset",
		});
	};

	if (state.currentQuestion < 10) {
		return (
			<>
				<h1>{firstQuestion.question}</h1>
				<p>Temps restant: {state.timeLeft}</p>
				<div className="option">
					{firstQuestion.options.map((option, index) => (
						<OptionQuizz key={index} option={option} />
					))}
				</div>
				<p>
					{state.score} {state.score <= 1 ? "point" : "points"}
				</p>
			</>
		);
	} else {
		return (
			<>
				<h1>Quizz over</h1>
				<p>Vous avez obtenu {state.score} sur 10</p>
				<button onClick={restartQuizz}>Recommencer</button>
			</>
		);
	}
};

export default Quizz;
