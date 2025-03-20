import "./style.scss";
import { useState, useRef, useEffect } from "react";
import { useUpdatePastriesMutation } from "../../store/slice/apiSlice.js";

const JouerPage = () => {
	const [updatePastries] = useUpdatePastriesMutation();
	const [isDisabled, setIsDisabled] = useState(false);
	const [nbrLancer, setNbrLancer] = useState(3);
	const [nbrPastries, setNbrPastries] = useState(0);
	const [resultMsg, setResultMsg] = useState("");
	const zoneDiceRef = useRef(null);

	// Vérifie les combinaisons et met à jour les pâtisseries
	const checkCombination = (result) => {
		// let suite = [];

		const count = result.reduce((acc, num) => {
			acc[num] = (acc[num] || 0) + 1;
			return acc;
		}, {});

		let suite = 0;
		if (
			(Object.keys(count)[0] == 1 &&
				Object.keys(count)[1] == 2 &&
				Object.keys(count)[2] == 3 &&
				Object.keys(count)[3] == 4 &&
				Object.keys(count)[4] == 5) ||
			(Object.keys(count)[0] == 2 &&
				Object.keys(count)[1] == 3 &&
				Object.keys(count)[2] == 4 &&
				Object.keys(count)[3] == 5 &&
				Object.keys(count)[4] == 6)
		) {
			suite = 1;
		}

		const frequencies = Object.values(count);
		const paire = frequencies.filter((f) => f === 2).length;
		const brelan = frequencies.filter((f) => f === 3).length;
		const carre = frequencies.filter((f) => f === 4).length;
		const yams = frequencies.filter((f) => f === 5).length;

		let newNbrPastries =
			yams > 0
				? 3
				: brelan > 0 && paire > 0
				? 2
				: carre > 0
				? 2
				: suite > 0
				? 2
				: paire > 1
				? 1
				: brelan > 0
				? 1
				: 0;
		setNbrPastries(newNbrPastries);
		setIsDisabled(true);

		const resultMsgElement = document.getElementById("resultMsg");
		resultMsgElement.classList.remove("win");

		if (newNbrPastries > 0) {
			updatePastries(newNbrPastries)
				.then((response) => {
					if (response.data?.length) {
						setResultMsg(
							<>
								<p>Bravo, Vous avez gagné :</p>
								<ul>
									{response.data.map((p, index) => (
										<li key={index}>{p.name}</li>
									))}
								</ul>
							</>
						);
						resultMsgElement.classList.add("win");
					} else {
						setResultMsg(`Vous avez gagné ${newNbrPastries} pâtisseries !`);
						resultMsgElement.classList.add("win");
					}
				})
				.catch(() => {
					setResultMsg("Une erreur est survenue lors de la mise à jour.");
				});
		} else {
			setResultMsg("Aucune combinaison gagnante. Essayez encore !");
		}

		localStorage.setItem("played", true);
	};

	// Permet de sélectionner/désélectionner un dé
	const keepDie = (nbrDie) => {
		const dices = zoneDiceRef.current.querySelectorAll("img");
		dices[nbrDie].classList.toggle("selected");
	};

	// Lance les dés (en gardant les sélectionnés)
	const throwDice = () => {
		if (!zoneDiceRef.current) return;
		const dices = zoneDiceRef.current;
		const diceKept = dices.querySelectorAll(".selected");

		dices.innerHTML = "";
		let result = [];

		for (let i = 0; i < 5; i++) {
			const dieLabel = `Dé n°${i + 1}`;
			const keptDie = Array.from(diceKept).find((die) => die.alt === dieLabel);

			if (keptDie) {
				dices.appendChild(keptDie);
				result.push(Number(keptDie.dataset.value));
			} else {
				const randomValue = Math.floor(Math.random() * 6) + 1;
				result.push(randomValue);

				const img = document.createElement("img");
				img.src = `/dice/dice${randomValue}.png`;
				img.alt = dieLabel;
				img.dataset.value = randomValue;
				img.addEventListener("click", () => keepDie(i));
				dices.appendChild(img);
			}
		}

		setNbrLancer((prev) => prev - 1);
		if (nbrLancer === 1) checkCombination(result);
	};

	// Fonction pour terminer la partie
	const endGame = () => {
		const dices = zoneDiceRef.current.querySelectorAll("img");
		const result = Array.from(dices).map((dice) => Number(dice.dataset.value));
		checkCombination(result);
	};

	// useEffect(() => {
	// 	const checkMidnightClear = () => {
	// 		const currentDate = new Date();
	// 		const currentDay = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD

	// 		// Vérifie la dernière date de nettoyage dans localStorage
	// 		const lastClearDate = localStorage.getItem("lastClearDate");

	// 		// Si la date du dernier nettoyage est différente de la date actuelle, on vide le localStorage
	// 		if (lastClearDate !== currentDay) {
	// 			// Vider le localStorage
	// 			localStorage.clear();

	// 			// Mettre à jour la date de dernier nettoyage
	// 			localStorage.setItem("lastClearDate", currentDay);
	// 		}
	// 	};

	// 	// Vérifier le nettoyage à chaque démarrage de l'application
	// 	checkMidnightClear();

	// 	// Récupérer 'played' depuis localStorage et le convertir en booléen
	// 	const played = localStorage.getItem("played") === "true";
	// 	if (played === true) {
	// 		setIsDisabled(true);
	// 	}
	// }, []);

	return (
		<div className="page" id="Jouer">
			<h2>Jeu du yams</h2>
			<p>
				Vous avez 3 lancés. <br />
				Si vous obtenez une paire (deux dés identiques), vous gagnez 1
				pâtisserie. <br />
				Avec un brelan (trois dés identiques), c&apos;est 2 pâtisserie. <br />
				Et en cas de carré (quatre dés identiques), vous remportez 3
				patisseries. <br />
				Accumulez les délices pour remporter la partie !.
			</p>

			<div className="zoneDice" ref={zoneDiceRef}>
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<img key={i} src={`/dice/dice0.png`} alt="?" />
					))}
			</div>

			<div id="resultMsg">{resultMsg}</div>

			<button onClick={throwDice} disabled={isDisabled}>
				{isDisabled
					? "Vous n'avez plus d'essais"
					: `Lancer les dés (${nbrLancer} restants)`}
			</button>

			<button onClick={endGame} disabled={isDisabled}>
				Terminer la partie
			</button>
		</div>
	);
};

export default JouerPage;
