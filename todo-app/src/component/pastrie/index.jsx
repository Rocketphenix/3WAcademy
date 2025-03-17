/* eslint-disable react/prop-types */
import "./style.scss";

const Pastrie = ({ pastrie }) => {
	return (
		<>
			<img src={pastrie.image} alt="img" />
			<p>
				{pastrie.name} {pastrie.quantity} {pastrie.quantityWon}
			</p>
		</>
	);
};

export default Pastrie;
