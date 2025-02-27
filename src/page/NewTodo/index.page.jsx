// path : redux-exemple/src/page/Home/index.page.jsx
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	selectNewTodoName,
	selectTodo,
} from "../../store/selector/todo-selector.js";
import { setTodoName, addTodo } from "../../store/slice/todoSlice.jsx";

const NewTodoPage = () => {
	const dispatch = useDispatch();
	const state = useSelector(selectTodo);
	const nameNewTodo = useSelector(selectNewTodoName);

	console.log(state);

	const handleChange = (e) => {
		dispatch(setTodoName(e.target.value));
	};

	const addNewTodo = () => {
		dispatch(
			addTodo({
				name: nameNewTodo,
			})
		);
	};

	return (
		<div className="page" id="NewTodo">
			<h2>hi</h2>
			<input onChange={handleChange} type={"text"} value={nameNewTodo} />
			<button onClick={addNewTodo}></button>
		</div>
	);
};

export default NewTodoPage;
