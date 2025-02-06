/* eslint-disable react/prop-types */
import { useCartContext } from "../../context/CartContext.jsx";
import "../../shop.css";

const Item = ({ item }) => {
	const { dispatch } = useCartContext();

	const addItem = ({ item }) => {
		dispatch({
			type: "addItem",
			item: item,
		});

		dispatch({
			type: "calculTotal",
		});
	};

	return (
		<>
			<div className="card">
				<img src={item.image} alt="img" />
				<p>{item.nom}</p>
				<p>{item.prix} €</p>
				<button onClick={() => addItem({ item })}>Ajouter au panier</button>
			</div>
		</>
	);
};

export default Item;
