import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice.js";
import { userSlice } from "./slice/userSlice.js";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		[userSlice.reducerPath]: userSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([apiSlice.middleware, userSlice.middleware]),
});

export default store;
