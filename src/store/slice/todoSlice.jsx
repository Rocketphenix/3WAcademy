import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useApi from "../../service/api.service.jsx";

const api = useApi();
export const fetchTodo = createAsyncThunk(
	"todo/fetchTodo",
	async (_, thunkAPI) => {
		return (await api.fetchTodos()).data;
	}
);

export const updateTodo = createAsyncThunk("todo/updateTodo", async (todo) => {
	return (await api.updateTodo(todo)).data;
});

let id = 200;
const initialState = {
	todos: [],
	newTodoName: "",
	isLoading: false,
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push({
				completed: false,
				id: id++,
				title: action.payload.name,
			});
			state.newTodoName = "";
		},
		setTodoName: (state, action) => {
			state.newTodoName = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodo.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchTodo.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchTodo.rejected, (state, action) => {
				state.isLoading = false;
			});

		builder.addCase(updateTodo.fulfilled, (state, action) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return action.payload;
				}
				return todo;
			});
		});
	},
});

export const { addTodo, setTodoName } = todoSlice.actions;

export default todoSlice.reducer;
