/* eslint-disable react/prop-types */
import "./style.scss";
import { NavLink } from "react-router";

const StyledLink = ({ to, children }) => {
	const checkIsActive = ({ isActive }) =>
		isActive ? { background: "#4a6a8d" } : {};

	return (
		<NavLink to={to} style={checkIsActive}>
			{children}
		</NavLink>
	);
};

export default StyledLink;
