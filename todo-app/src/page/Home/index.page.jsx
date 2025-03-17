import "./style.scss";
import { useGetPastriesQuery } from "../../store/slice/apiSlice.js";
import Pastrie from "../../component/pastrie/index.jsx";
import StyledLink from "../../component/StyledLink/index.jsx";
import { useEffect } from "react";

const HomePage = () => {
	const {
		data: pastries,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
	} = useGetPastriesQuery();

	useEffect(() => {
		refetch(); // Recharger les pâtisseries après la mise à jour
	}, [refetch]);

	let content;
	if (isLoading) content = <div>Chargement...</div>;
	if (isError) content = <div>Erreur: {error.error}</div>;
	if (isSuccess) {
		content = (
			<div className="lotsPlastries">
				{pastries.map((pastrie) => (
					<Pastrie key={pastrie.id} pastrie={pastrie} />
				))}
			</div>
		);
	}

	return (
		<div className="page" id="Home">
			<h2>
				Jouez à notre jeu de Yam&apos;s pour tenter de remporter des lots !
			</h2>
			<StyledLink to={"/jouer"}>Jouer</StyledLink>
			<h3>Lots restants :</h3>
			{content}
		</div>
	);
};

export default HomePage;
