/* eslint-disable react/prop-types */
import "./style.scss";

const PastrieCard = ({ pastrie }) => {
	return (
		pastrie.quantity > 0 && (
			<div className="card">
				<img src="https://picsum.photos/200" alt={pastrie.image} />
				<p>
					{pastrie.name}: <span>{pastrie.quantity}</span>
				</p>
			</div>
		)
	);
};
export default PastrieCard;
