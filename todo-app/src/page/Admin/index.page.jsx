import "./style.scss";
import { useGetPastriesQuery } from "../../store/slice/apiSlice.js";
import { useCheckLoginQuery } from "../../store/slice/userSlice.js"; // Vérifier la connexion
import PastrieList from "../../component/pastrieList/index.jsx";
import StyledLink from "../../component/StyledLink/index.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
	const navigate = useNavigate();
	const [filter, setFilterValue] = useState("");

	// Vérification de la connexion utilisateur
	const { isError } = useCheckLoginQuery();

	// Récupération des pâtisseries
	const {
		data: pastries,
		isLoading,
		isSuccess,
		refetch,
	} = useGetPastriesQuery();

	// Rediriger si l'utilisateur n'est pas connecté
	useEffect(() => {
		if (isError) {
			navigate("/"); // Redirige vers l'accueil si déconnecté
		}
	}, [isError, navigate]);

	// Recharger les pâtisseries après la mise à jour
	useEffect(() => {
		refetch();
	}, [refetch]);

	let content;
	if (isLoading) content = <div>Chargement...</div>;
	if (isSuccess) {
		content = (
			<div className="listPastries">
				<div className="card title">
					<div>
						<p>Image</p>
					</div>
					<div>
						<p>Nom</p>
					</div>
					<div>
						<p>Quantités restantes</p>
					</div>
					<div>
						<p>Actions</p>
					</div>
				</div>
				{pastries.map((pastrie) => (
					<PastrieList
						key={pastrie.id}
						pastrie={pastrie}
						refetch={refetch}
						filter={filter}
					/>
				))}
			</div>
		);
	}

	const filtering = (e) => {
		const newFilter = e.target.value.toLowerCase();

		if (newFilter.length >= 3) {
			setFilterValue(newFilter);
		} else {
			setFilterValue("");
		}
	};

	return (
		<div className="page" id="Admin">
			<h2>Administration</h2>
			<h3>Liste des pâtisseries</h3>
			<StyledLink to="/newPastrie">Ajouter une pâtisserie</StyledLink>

			<div className="filter">
				<input
					type="text"
					id="filter"
					onChange={filtering}
					placeholder="filtre"
				/>
			</div>
			{content}
		</div>
	);
};

export default AdminPage;
