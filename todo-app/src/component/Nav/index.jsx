import "./style.scss";
import StyledLink from "../StyledLink/index.jsx";

const Nav = () => {
	return (
		<nav className="Nav">
			<h1>La pâtisserie 3WA</h1>
			<ul>
				<li>
					<StyledLink to={"/"}>Accueil</StyledLink>
				</li>
				<li>
					<StyledLink to={"/login"}>Login</StyledLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
