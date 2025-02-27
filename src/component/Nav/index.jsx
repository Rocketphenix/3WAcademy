// path: dice-game/src/component/Nav/index.jsx
import "./style.scss";
import StyledLink from "../StyledLink/index.jsx";

const Nav = () => {
	return (
		<nav className="Nav">
			<ul>
				<li>
					<StyledLink to={"/"}>Home</StyledLink>
				</li>
				<li>
					<StyledLink to={"/NewTodo"}>Description</StyledLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
