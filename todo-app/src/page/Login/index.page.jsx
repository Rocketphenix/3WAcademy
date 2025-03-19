import "./style.scss";
import { useState } from "react";
import {
	useLoginMutation,
	useCheckLoginQuery,
} from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom"; // Utilisez le hook de navigation pour rediriger

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const { refetch } = useCheckLoginQuery();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate(); // Hook pour la navigation

	const connection = async () => {
		try {
			const response = await login({ email, password }).unwrap();
			setMessage(response.message);

			await refetch(); // Rafraîchit les données après connexion
			navigate("/"); // Redirige vers la page de tableau de bord par exemple
		} catch (err) {
			// Si une erreur survient affiche un message d'erreur
			setMessage(err?.data?.message || "Erreur lors de la connexion.");
		}
	};

	return (
		<div className="page" id="Login">
			<h2>Connexion</h2>

			<div className="form">
				<label>Votre e-mail</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label>Votre mot de passe</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button onClick={connection} disabled={isLoading}>
					{isLoading ? "Connexion en cours..." : "Login"}
				</button>

				{message && <p className="message">{message}</p>}
			</div>
		</div>
	);
};

export default LoginPage;
