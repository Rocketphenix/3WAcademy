import "./style.scss";
import { useState } from "react";
import {
	useLoginMutation,
	useCheckLoginQuery,
} from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom"; // Utilisez le hook de navigation pour rediriger

const LoginPage = () => {
	const [login, { isLoading, error }] = useLoginMutation();
	const { refetch } = useCheckLoginQuery(); // Permet de rafraîchir les données d'authentification
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate(); // Hook pour la navigation

	const connection = async () => {
		try {
			// Attendez la réponse de la requête de connexion
			const response = await login({ email, password }).unwrap();

			// Une fois la connexion réussie, vous pouvez afficher un message de succès
			setMessage("Connexion réussie !");
			console.log("Réponse de l'API :", response);

			await refetch(); // 🔥 Rafraîchit les données après connexion
			// Vous pouvez aussi rediriger l'utilisateur vers une autre page après la connexion réussie
			navigate("/dashboard"); // Redirige vers la page de tableau de bord par exemple
		} catch (err) {
			// Si une erreur survient, vous pouvez afficher un message d'erreur
			setMessage(err?.data?.message || "Erreur lors de la connexion.");
		}
	};

	return (
		<div className="page" id="Login">
			<h2>Connexion</h2>

			<div className="form">
				<label>Email</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label>Mot de passe</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button onClick={connection} disabled={isLoading}>
					{isLoading ? "Connexion en cours..." : "Se connecter"}
				</button>

				{message && <p className="message">{message}</p>}
			</div>
		</div>
	);
};

export default LoginPage;
