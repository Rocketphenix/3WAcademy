/* eslint-disable react/prop-types */
import "./style.scss";
import { useNavigate } from "react-router-dom";

const PostsItem = ({ post }) => {
	const navigate = useNavigate();

	const handleClick = (post) => {
		navigate(`/post/${post.id}`, { state: { post } });
	};

	return (
		<div className="post">
			<p className="postTitle">{post.title}</p>
			<p className="postBody">{post.body}</p>
			<p className="postAuthor">Fait par {post.userId}</p>
			<button onClick={() => handleClick(post)}>Voir Post</button>
		</div>
	);
};

export default PostsItem;
