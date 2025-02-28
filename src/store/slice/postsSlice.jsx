import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useApi from "../../service/api.service.jsx";

const api = useApi();
let id = 10;

export const fetchPost = createAsyncThunk(
	"post/fetchPost",
	async (limit = id++) => {
		const response = await api.fetchPosts(limit);
		return response.data;
	}
);

export const createPost = createAsyncThunk(
	"post/createPost",
	async ({ title, body }) => {
		const response = await api.addPost({ title, body });
		return { ...response.data, id: id++ };
	}
);

const initialState = {
	posts: [],
	isLoading: false,
	error: null,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPost.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchPost.fulfilled, (state, action) => {
				state.posts = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.posts.unshift(action.payload);
				state.isLoading = false;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export default postSlice.reducer;
