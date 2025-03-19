import "./style.scss";
import StyledLink from "../StyledLink/index.jsx";
import {
	useCheckLoginQuery,
	useLogoutMutation,
} from "../../store/slice/userSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate();

	// Vérifier si l'utilisateur est connecté
	const { data: logs, isSuccess, refetch } = useCheckLoginQuery();

	// Mutation pour la déconnexion
	const [logoutUser, { isSuccess: logoutSuccess }] = useLogoutMutation();

	// Gestion du logout
	const handleLogout = async () => {
		await logoutUser();
		refetch();
		navigate("/"); // Redirige vers la page de connexion
	};

	// Effet pour actualiser l’état après la déconnexion
	useEffect(() => {
		if (logoutSuccess) {
			refetch();
		}
	}, [logoutSuccess, refetch]);

	return (
		<nav className="Nav">
			<h1>La pâtisserie 3WA</h1>
			<ul>
				<li>
					<StyledLink to="/">Accueil</StyledLink>
				</li>

				{isSuccess ? (
					// Si connecté, affichage des liens Admin + Logout
					<>
						<li>
							<StyledLink to="/admin">Admin</StyledLink>
						</li>
						<li>
							<button onClick={handleLogout} className="logout-btn">
								Logout
							</button>
						</li>
					</>
				) : (
					// Si non connecté, affichage du lien Login
					<li>
						<StyledLink to="/login">Login</StyledLink>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
