/* eslint-disable react/prop-types */
import { useState } from "react";
import "./style.scss";
import {
	useModifPastrieMutation,
	useDeletePastrieMutation,
} from "../../store/slice/userSlice";

const PastrieList = ({ pastrie, refetch, filter }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: pastrie.name,
		quantity: pastrie.quantity,
	});

	const [modifPastrie, { isLoading, error }] = useModifPastrieMutation(); // Appelle le hook ici
	const [deletePastrie] = useDeletePastrieMutation();

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
			await modifPastrie({ id: pastrie.id, ...formData }).unwrap();
			setIsEditing(false);
			refetch();
		} catch (err) {
			console.error("Erreur lors de la mise à jour :", err);
		}
	};

	const deleting = async () => {
		try {
			await deletePastrie({ id: pastrie.id });
			refetch();
		} catch (err) {
			console.error("Erreur lors de la suppresion :", err);
		}
	};

	return (
		pastrie.name.toLowerCase().includes(filter) && (
			<div className="card">
				<div>
					<img src="https://picsum.photos/200" alt={pastrie.image} />
				</div>

				<div>
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
				</div>

				<div>
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
				</div>

				<div className="buttons">
					{isEditing ? (
						<button onClick={handleSave} disabled={isLoading}>
							{isLoading ? "Enregistrement..." : "Valider"}
						</button>
					) : (
						<button onClick={() => setIsEditing(true)}>Modifier</button>
					)}
					<button onClick={deleting}>Supprimer</button>
				</div>

				{error && <p className="error">Erreur : {error.data?.message}</p>}
			</div>
		)
	);
};

export default PastrieList;
