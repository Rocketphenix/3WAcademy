/* eslint-disable react/prop-types */
import "./style.scss";

const Pastrie = ({ pastrie }) => {
	return (
		<div className="card">
			<img src="https://picsum.photos/200" alt={pastrie.image} />
			<p>
				{pastrie.name} {pastrie.quantity} {pastrie.quantityWon}
			</p>
		</div>
	);
};

export default Pastrie;
