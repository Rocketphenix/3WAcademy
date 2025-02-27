import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTodo } from "../../store/slice/todoSlice.jsx";

const TodoDetail = () => {
	const location = useLocation();
	const todo = location.state?.todo; // Récupération de la todo
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Pour rediriger après modification

	// État local pour le titre
	const [title, setTitle] = useState(todo?.title || "");

	if (!todo) {
		return <p>Aucune todo trouvée</p>;
	}

	// Mettre à jour Redux avec le nouveau titre
	const handleUpdate = () => {
		if (title.trim() !== "") {
			dispatch(updateTodo({ ...todo, title })); // Envoi à Redux
			navigate(-1); // Retour à la liste des todos
		}
	};

	return (
		<div>
			<h2>Détails de la Todo</h2>
			<label>Nom:</label>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<p>Status: {todo.completed ? "Complété" : "En cours"}</p>
			<button onClick={handleUpdate}>Modifier</button>
		</div>
	);
};

export default TodoDetail;
