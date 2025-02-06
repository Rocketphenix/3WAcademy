import { useReducer } from "react";

const initialState = {
	panier: [],
	total: 0,
	reduction: 0,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "addItem": {
			// Cherche si un objet du panier porte déjà se nom et récupére sont id
			const ItemID = state.panier.findIndex(
				(item) => item.nom === action.item.nom
			);

			let newPanier;
			if (ItemID !== -1) {
				// L'item est déjà dans le panier on augmente la quantité
				newPanier = state.panier.map((item, index) =>
					index === ItemID ? { ...item, quantite: item.quantite + 1 } : item
				);
			} else {
				// L'item n'est pas dans le panier on crée un nouvelle objet
				newPanier = [...state.panier, { ...action.item, quantite: 1 }];
			}

			return {
				...state,
				panier: newPanier,
				total: state.total + Number(action.item.prix), // Mise à jour du total
			};
		}

		case "delItem": {
			const ItemID = state.panier.findIndex(
				(item) => item.nom === action.item.nom
			);

			if (ItemID === -1) {
				return state; // L'item n'existe pas, on ne fait rien
			}

			let newPanier = state.panier.map((item, index) =>
				index === ItemID ? { ...item, quantite: item.quantite - 1 } : item
			);

			// Supprime l'item si sa quantité est <= 0
			newPanier = newPanier.filter((item) => item.quantite > 0);

			return {
				...state,
				panier: newPanier,
				total: state.total - Number(action.item.prix), // Mise à jour du total
			};
		}

		case "modifItem":
			break;

		case "calculTotal": {
			let total = 0;
			state.panier.map((item) => {
				total = total + item.prix * item.quantite;
			});
			if (total < 100) {
				return {
					...state,
					total: total,
					reduction: 0,
				};
			} else {
				total = total - total / 10;
				return {
					...state,
					total: total,
					reduction: 10,
				};
			}
		}

		default:
			return state;
	}
};

const useCartReducer = () => useReducer(reducer, initialState);

export default useCartReducer;
