import "./style.scss";
import { useAddPastrieMutation } from "../../store/slice/userSlice.js";
import StyledLink from "../../component/StyledLink/index.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react"; // Utilisation de useRef pour gérer les inputs

const NewPastriePage = () => {
	const [addPastrie, { isLoading, error }] = useAddPastrieMutation();
	const navigate = useNavigate();

	// Références pour les champs du formulaire
	const nomRef = useRef(null); // Recupere le input nom
	const quantityRef = useRef(null);
	const imgRef = useRef(null);

	const createPastrie = async (event) => {
		event.preventDefault();

		const data = {
			name: nomRef.current.value, // Récupére la valeur actuelle du input nom
			quantity: quantityRef.current.value,
			image: imgRef.current.value,
			choice: "default",
		};

		try {
			await addPastrie(data).unwrap();
			navigate("/admin"); // Redirection après l'ajout
		} catch (err) {
			console.error("Erreur lors de la mise à jour :", err);
		}
	};

	return (
		<div className="page" id="AddPastrie">
			<h2>Ajouter une pâtisserie</h2>
			<form onSubmit={createPastrie}>
				<label htmlFor="nom">Nom</label>
				<input type="text" name="nom" id="nom" ref={nomRef} />

				<label htmlFor="quantity">Quantité</label>
				<input type="number" name="quantity" id="quantity" ref={quantityRef} />

				<label htmlFor="img">Image</label>
				<input type="text" name="img" id="img" ref={imgRef} />

				<div className="buttons">
					<StyledLink to="/admin">Annuler</StyledLink>
					<button type="submit" disabled={isLoading}>
						{isLoading ? "Ajout en cours..." : "Créer la pâtisserie"}
					</button>
				</div>
			</form>

			{error && <p className="error">Erreur : {error.message}</p>}
		</div>
	);
};

export default NewPastriePage;
