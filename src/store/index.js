import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slice/postsSlice";
import commentReducer from "./slice/commentSlice";

const store = configureStore({
	reducer: {
		post: postReducer,
		comment: commentReducer,
	},
});

export default store;
