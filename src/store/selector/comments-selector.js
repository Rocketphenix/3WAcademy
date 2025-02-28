export const selectComments = (state, postId) =>
	state.comment.commentsByPost[postId] || [];
export const selectCommentsLoading = (state) => state.comment.isLoading;
export const selectNewCommentName = (state) => state.comment.newCommentName;
export const selectNewCommentBody = (state) => state.comment.newCommentBody;
