import "./style.scss";
import { useState } from "react";
import {
	useGetPastriesQuery,
	useUpdatePastriesMutation,
} from "../../store/slice/apiSlice.js"; // Import de l'API pour mettre à jour les pâtisseries

const JouerPage = () => {
	const { data: pastries, refetch } = useGetPastriesQuery();
	const [updatePastries] = useUpdatePastriesMutation(); // Hook pour la mutation (mise à jour des pâtisseries)

	const [isDisabled, setIsDisabled] = useState(false);
	const [nbrLancer, setNbrLancer] = useState(3);
	const [resultMessage, setResultMessage] = useState(""); // Message de résultat
	const [nbrPastries, setNbrPastries] = useState(0); // Nombre de pâtisseries gagnées

	// Fonction pour vérifier s'il y a des combinaisons d'un certain nombre
	const checkCombination = (result) => {
		// Compter les occurrences de chaque valeur de dé
		const count = result.reduce((acc, num) => {
			acc[num] = (acc[num] || 0) + 1;
			return acc;
		}, {});

		// Vérification des combinaisons possibles
		const frequencies = Object.values(count);
		const pairs = frequencies.filter((f) => f === 2).length;
		const threes = frequencies.filter((f) => f === 3).length;
		const fours = frequencies.filter((f) => f === 4).length;

		// Retourner le nombre de pâtisseries gagnées en fonction de la combinaison
		if (fours > 0) {
			return nbrPastries + 3;
		} else if (threes > 0) {
			return nbrPastries + 2;
		} else if (pairs > 0) {
			return nbrPastries + 1;
		} else {
			return nbrPastries; // Aucune combinaison gagnante
		}
	};

	// Fonction pour lancer les dés
	const throwDice = () => {
		const dice = document.querySelector(".zoneDice");
		dice.innerHTML = ""; // Réinitialiser la zone des dés

		let result = [];

		// Générer les 5 dés aléatoires et les afficher
		for (let i = 0; i < 5; i++) {
			const nbr = Math.floor(Math.random() * 6) + 1;
			result.push(nbr);

			const img = document.createElement("img");
			img.src = `/dice/dice${nbr}.png`; // Récupère l'image correspondant au dé
			img.alt = `Dé n°${i + 1}`;
			dice.appendChild(img);
		}

		// Vérification des combinaisons après avoir généré les dés et mise à jour du message
		let newNbrPastries = checkCombination(result);

		setNbrLancer(nbrLancer - 1);
		if (nbrLancer === 1) {
			setIsDisabled(true);
			if (newNbrPastries > 0) {
				// Créer un objet pour compter les occurrences de chaque pâtisserie
				const pastryCounts = {};

				// Ajouter les pâtisseries choisies au tableau
				for (let i = 0; i < newNbrPastries; i++) {
					const nbr = Math.floor(Math.random() * pastries.length);
					const chosenPastry = pastries[nbr].name;

					// Compter les occurrences de chaque pâtisserie
					if (pastryCounts[chosenPastry]) {
						pastryCounts[chosenPastry] += 1;
					} else {
						pastryCounts[chosenPastry] = 1;
					}

					// Mise à jour des pâtisseries dans la base via l'API
					updatePastries(1);
				}

				// Créer un message avec les pâtisseries et leur quantité
				let pastryMessage = "Vous avez gagné ";
				const pastryEntries = Object.entries(pastryCounts);

				// Générer le message avec la quantité pour chaque pâtisserie
				pastryMessage += pastryEntries
					.map(([name, count]) => `${count} ${name}`)
					.join(", ");
				pastryMessage += ".";

				setResultMessage(pastryMessage);
			} else {
				setResultMessage("Aucune combinaison gagnante. Essayez encore !");
			}
		}

		setNbrPastries(newNbrPastries);
	};

	return (
		<div className="page" id="Login">
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

			<div className="zoneDice">
				<img src={`/dice/dice0.png`} alt="?" />
				<img src={`/dice/dice0.png`} alt="?" />
				<img src={`/dice/dice0.png`} alt="?" />
				<img src={`/dice/dice0.png`} alt="?" />
				<img src={`/dice/dice0.png`} alt="?" />
			</div>

			{/* Affichage du message de résultat */}
			<span>{resultMessage}</span>

			<button onClick={throwDice} disabled={isDisabled}>
				{isDisabled
					? "Vous n'avez plus de d'essais"
					: `Lancer les dés (${nbrLancer} Lancer restant)`}
			</button>
		</div>
	);
};

export default JouerPage;
