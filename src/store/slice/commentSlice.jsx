import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useApi from "../../service/api.service.jsx";

const api = useApi();

export const fetchComments = createAsyncThunk(
	"comments/fetchComments",
	async ({ postId, limit = 5 }) => {
		const response = await api.fetchComments(postId, limit);
		return { postId, comments: response.data };
	}
);

async (limit = 7) => {
	const response = await api.fetchPosts(limit);
	return response.data;
};

const initialState = {
	commentsByPost: {},
	isLoading: false,
	error: null,
	newCommentName: "",
	newCommentBody: "",
};

const commentSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		addComment: (state, action) => {
			const { postId, name, body } = action.payload;

			if (!state.commentsByPost[postId]) {
				state.commentsByPost[postId] = [];
			}

			state.commentsByPost[postId].push({
				id: new Date().getTime(), // Simule un ID unique
				name: name,
				email: state.commentsByPost[postId][1].email,
				body: body,
			});

			state.newCommentName = "";
			state.newCommentBody = "";
		},
		setCommentName: (state, action) => {
			state.newCommentName = action.payload;
		},
		setCommentBody: (state, action) => {
			state.newCommentBody = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				const { postId, comments } = action.payload;
				state.commentsByPost[postId] = comments;
				state.isLoading = false;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { addComment, setCommentName, setCommentBody } =
	commentSlice.actions;

export default commentSlice.reducer;
