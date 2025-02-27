import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";

const store = configureStore({
	reducer: {
		todos: todoSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

export default store;
