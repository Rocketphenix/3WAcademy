/* eslint-disable react/prop-types */
import { useCartContext } from "../../context/CartContext.jsx";
const PanierItem = ({ panierItem }) => {
	const { dispatch } = useCartContext();

	const delItem = ({ panierItem }) => {
		dispatch({
			type: "delItem",
			item: panierItem,
		});
	};

	return (
		<>
			<div className="card panier">
				<img src={panierItem.image} alt="img" />
				<p>{panierItem.nom}</p>
				<p>{panierItem.quantite} fois</p>
				<p>{panierItem.prix * panierItem.quantite} €</p>
				<button onClick={() => delItem({ panierItem })}>
					Retirer du panier
				</button>
			</div>
		</>
	);
};

export default PanierItem;
