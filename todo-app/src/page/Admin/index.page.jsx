import "./style.scss";
import { useGetPastriesQuery } from "../../store/slice/apiSlice.js";
import PastrieList from "../../component/pastrieList/index.jsx";
import StyledLink from "../../component/StyledLink/index.jsx";
import { useEffect } from "react";

const AdminPage = () => {
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
			<div className="listPastries">
				<div className="card">
					<p>Image</p>
					<p>Nom</p>
					<p>Quantités restantes</p>
					<p>Actions</p>
				</div>
				{pastries.map((pastrie) => (
					<PastrieList key={pastrie.id} pastrie={pastrie} />
				))}
			</div>
		);
	}

	return (
		<div className="page" id="Admin">
			<h2>Administration</h2>
			<h3>Liste des patisseries</h3>
			<StyledLink to={"/newPastrie"}>Ajouter une pâtisserie</StyledLink>
			{content}
		</div>
	);
};

export default AdminPage;
