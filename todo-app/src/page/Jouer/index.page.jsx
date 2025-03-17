import "./style.scss";
import { useState } from "react";
import {
	useGetPastriesQuery,
	useUpdatePastriesMutation,
} from "../../store/slice/apiSlice.js"; // Import de l'API pour mettre à jour les pâtisseries

const JouerPage = () => {
	const { data: pastries } = useGetPastriesQuery();
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
	const throwDice = async () => {
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
			const resultMsg = document.getElementById("resultMsg");
			resultMsg.innerHTML = "";

			if (newNbrPastries > 0) {
				try {
					const response = await updatePastries(newNbrPastries).unwrap(); // Attendre la mise à jour
					console.log("Pâtisseries mises à jour :", response);

					// Si la réponse contient les pâtisseries gagnées
					if (response && response.length > 0) {
						resultMsg.innerText = "Vous avez gagné : ";

						response.forEach((p) => {
							const newLi = document.createElement("li"); // Créer un élément <li>
							newLi.innerText = `${p.name}`; // Ajouter le nom de la pâtisserie
							resultMsg.appendChild(newLi); // L'ajouter à la liste
						});
						resultMsg.innerText += " !";
					} else {
						resultMsg.innerText = `Vous avez gagné ${newNbrPastries} pâtisseries !`;
					}
				} catch (error) {
					console.error("Erreur de mise à jour :", error);
					resultMsg.innerText =
						"Une erreur est survenue lors de la mise à jour.";
				}
			} else {
				resultMsg.innerText = "Aucune combinaison gagnante. Essayez encore !";
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
			<div id="resultMsg"></div>

			<button onClick={throwDice} disabled={isDisabled}>
				{isDisabled
					? "Vous n'avez plus de d'essais"
					: `Lancer les dés (${nbrLancer} Lancer restant)`}
			</button>
		</div>
	);
};

export default JouerPage;
