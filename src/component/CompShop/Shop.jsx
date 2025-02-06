import { useCartContext } from "../../context/CartContext.jsx";
import "../../shop.css";
import Item from "./Item.jsx";
import PanierItem from "./PanierItem.jsx";

const Shop = () => {
	const { state } = useCartContext();
	const items = [
		{
			nom: "Montre de luxe",
			image: "https://picsum.photos/200?random=1",
			prix: 120,
		},
		{
			nom: "Sac à dos",
			image: "https://picsum.photos/200?random=2",
			prix: 80,
		},
		{
			nom: "Casque audio",
			image: "https://picsum.photos/200?random=3",
			prix: 150,
		},
		{
			nom: "Smartphone",
			image: "https://picsum.photos/200?random=4",
			prix: 600,
		},
		{
			nom: "Chaussures de sport",
			image: "https://picsum.photos/200?random=5",
			prix: 90,
		},
	];

	return (
		<>
			<h1>Objet en vente</h1>
			<div className="item">
				{items.map((item, index) => (
					<Item key={index} item={item} />
				))}
			</div>
			<h2>Panier</h2>
			<div className="item">
				{state.panier.map((item, index) => (
					<PanierItem key={index} panierItem={item} />
				))}
			</div>
			{state.total > 0 && (
				<p>
					Prix Total: {state.total}{" "}
					{state.reduction > 0 ? ` | Réduction: ${state.reduction}%` : ""}
				</p>
			)}
		</>
	);
};

export default Shop;
