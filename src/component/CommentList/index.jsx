/* eslint-disable react/prop-types */
import "./style.scss";
const Comment = ({ comment }) => {
	return (
		<div className="comment">
			<h4>{comment.name}</h4>
			<p>{comment.body}</p>
			<small>{comment.email}</small>
		</div>
	);
};

export default Comment;
