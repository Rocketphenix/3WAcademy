/* eslint-disable react/prop-types */
// path: dice-game/src/component/StyledLink/index.jsx
import "./style.scss";
import { NavLink } from "react-router";

const StyledLink = ({ to, children }) => {
	const checkIsActive = ({ isActive }) => (isActive ? { color: "orange" } : {});

	return (
		<NavLink to={to} style={checkIsActive}>
			{children}
		</NavLink>
	);
};

export default StyledLink;
