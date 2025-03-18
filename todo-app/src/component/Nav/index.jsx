import "./style.scss";
import StyledLink from "../StyledLink/index.jsx";
import { useCheckLoginQuery } from "../../store/slice/userSlice.js";

const Nav = () => {
	// Appel de l'API pour vérifier si l'utilisateur est connecté
	const { data: logs, isSuccess, isError, error } = useCheckLoginQuery();

	let content;
	if (isSuccess) {
		// Si l'utilisateur est connecté, on peut afficher son nom ou autre info
		content = <div className="user-info"></div>;
	}

	return (
		<nav className="Nav">
			<h1>La pâtisserie 3WA</h1>
			<ul>
				<li>
					<StyledLink to={"/"}>Accueil</StyledLink>
				</li>
				{isSuccess && ( // Si l'utilisateur est connecté, on affiche ces liens
					<>
						<li>
							<StyledLink to={"/admin"}>Admin</StyledLink>
						</li>
						<li>
							<StyledLink to={"/logout"}>Logout</StyledLink>
						</li>
					</>
				)}
				{!isSuccess && ( // Si l'utilisateur n'est pas connecté, afficher ce lien
					<li>
						<StyledLink to={"/login"}>Login</StyledLink>
					</li>
				)}
				{content}
			</ul>
		</nav>
	);
};

export default Nav;
