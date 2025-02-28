import "./style.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../store/slice/commentSlice";
import {
	selectComments,
	selectCommentsLoading,
	selectNewCommentName,
	selectNewCommentBody,
} from "../../store/selector/comments-selector";
import {
	addComment,
	setCommentName,
	setCommentBody,
} from "../../store/slice/commentSlice";
import Comment from "../../component/CommentList";
import StyledLink from "../../component/StyledLink";

const PostDetail = () => {
	const location = useLocation();
	const post = location.state.post;
	const dispatch = useDispatch();

	const comments = useSelector((state) => selectComments(state, post?.id));
	const isLoading = useSelector(selectCommentsLoading);
	const nameNewComment = useSelector(selectNewCommentName);
	const bodyNewComment = useSelector(selectNewCommentBody);

	useEffect(() => {
		if (post?.id) {
			let limit = Math.ceil(Math.random() * 7);
			dispatch(fetchComments({ postId: post.id, limit: limit }));
		}
	}, [dispatch, post?.id]);

	const handleChangeName = (e) => {
		dispatch(setCommentName(e.target.value));
	};

	const handleChangeBody = (e) => {
		dispatch(setCommentBody(e.target.value));
	};

	const addNewComment = () => {
		if (!post?.id) return;

		dispatch(
			addComment({
				postId: post.id,
				name: nameNewComment,
				body: bodyNewComment,
			})
		);
	};

	const navigate = useNavigate();
	useEffect(() => {
		if (!post) {
			navigate(-1);
		}
	}, [post, navigate]);

	return (
		<div>
			<StyledLink to={"/"}>Revenir</StyledLink>
			<div className="postDetail">
				<h2>{post.title}</h2>
				<p>{post.body}</p>
			</div>

			<div className="commentForm">
				<h3>Ajouter un commentaire :</h3>
				<input
					type="text"
					placeholder="Titre"
					onChange={handleChangeName}
					value={nameNewComment}
				/>
				<textarea
					placeholder="Ajoutez un commentaire..."
					onChange={handleChangeBody}
					value={bodyNewComment}></textarea>
				<button onClick={addNewComment}>Envoyer</button>
			</div>

			<h3>Commentaires :</h3>
			{isLoading ? (
				<p>Chargement des commentaires...</p>
			) : comments?.length > 0 ? (
				comments.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))
			) : (
				<p>Aucun commentaire disponible.</p>
			)}
		</div>
	);
};

export default PostDetail;
