import "./style.scss";
import { useSelector } from "react-redux";
import { selectPosts } from "../../store/selector/posts-selector";
import PostsItem from "../PostsItem";

const PostsList = () => {
	const posts = useSelector(selectPosts);
	if (!posts.length) return <p>Aucun post disponible.</p>;

	return (
		<div className="PostsList">
			<h2>Liste des Posts</h2>
			{posts.map((post) => (
				<PostsItem key={post.id} post={post}></PostsItem>
			))}
		</div>
	);
};

export default PostsList;
