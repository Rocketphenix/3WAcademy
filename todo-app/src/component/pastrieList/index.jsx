/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.scss";
import { useModifPastriesMutation } from "../../store/slice/apiSlice";

const PastrieList = ({ pastrie }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: pastrie.name,
		quantity: pastrie.quantity,
	});

	const [modifPastries, { isLoading, error }] = useModifPastriesMutation(); // ✅ Appelle le hook ici

	// Fonction pour gérer le changement des inputs
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Fonction pour sauvegarder les modifications
	const handleSave = async () => {
		try {
			await modifPastries({ id: pastrie.id, ...formData }).unwrap(); // ✅ Envoie la requête API
			setIsEditing(false); // Désactive le mode édition
		} catch (err) {
			console.error("Erreur lors de la mise à jour :", err);
		}
	};

	return (
		<div className="card">
			<img src="https://picsum.photos/200" alt={pastrie.image} />

			{isEditing ? (
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			) : (
				<p>{pastrie.name}</p>
			)}

			{isEditing ? (
				<input
					type="number"
					name="quantity"
					value={formData.quantity}
					onChange={handleChange}
				/>
			) : (
				<p>{pastrie.quantity}</p>
			)}

			<div>
				{isEditing ? (
					<button onClick={handleSave} disabled={isLoading}>
						{isLoading ? "Enregistrement..." : "Valider"}
					</button>
				) : (
					<button onClick={() => setIsEditing(true)}>Modifier</button>
				)}
				<button>Supprimer</button>
			</div>

			{error && <p className="error">Erreur : {error.data?.message}</p>}
		</div>
	);
};

export default PastrieList;
