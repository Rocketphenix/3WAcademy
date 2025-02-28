import "./style.scss";
import PostsList from "../../component/PostsList";

const HomePage = () => {
	return (
		<div className="page" id="Home">
			<PostsList />
		</div>
	);
};

export default HomePage;
