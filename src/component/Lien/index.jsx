import { Link } from "react-router-dom";
import "./style.scss";

const Navigate = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="nav-link">
				Home
			</Link>
			<Link to="/settings" className="nav-link">
				Dénomination
			</Link>
		</nav>
	);
};

export default Navigate;
