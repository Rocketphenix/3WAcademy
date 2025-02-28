import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/slice/postsSlice";
import { useState } from "react";

const AddPostPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.post.isLoading);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = () => {
		if (!title || !body) {
			setError(true);
			return;
		}

		setError(false);
		dispatch(createPost({ title, body }));
		setTitle("");
		setBody("");
	};

	return (
		<>
			<div className="postForm">
				<h3>Ajouter un nouveau post</h3>
				<input
					type="text"
					placeholder="Titre du post"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="Écris le contenu ici..."
					value={body}
					onChange={(e) => setBody(e.target.value)}></textarea>
				<button onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? "Ajout en cours..." : "Ajouter"}
				</button>
			</div>
			{error && <p className="error">Veuillez remplir tous les champs.</p>}
		</>
	);
};

export default AddPostPage;
