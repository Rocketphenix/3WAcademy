import { useMorpionContext } from "../../context/MorpionContext";

const Header = () => {
	const { state } = useMorpionContext();

	return (
		<>
			<h1>Tour de {state.resultats[state.playerActif].player} </h1>
		</>
	);
};

export default Header;
