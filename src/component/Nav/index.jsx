import "./style.scss";
import StyledLink from "../StyledLink/index.jsx";

const Nav = () => {
	return (
		<nav className="Nav">
			<ul>
				<li>
					<StyledLink to={"/"}>Accueil</StyledLink>
				</li>
				<li>
					<StyledLink to={"/add-post"}>Ajouter un Post</StyledLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
