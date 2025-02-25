import { configureStore } from "@reduxjs/toolkit";
import denominationReducer from "./reducer/denominationReducer.js";

export const store = configureStore({
	reducer: {
		denomination: denominationReducer,
	},
});
