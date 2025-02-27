// path: redux-exemple/src/component/TodoList/index.jsx
import "./style.scss";
import { useSelector } from "react-redux";
import { selectTodo } from "../../store/selector/todo-selector.js";
import TodoItem from "../TodoItem/index.jsx";

const TodoList = () => {
	const todos = useSelector(selectTodo);

	return (
		<div className="TodoList">
			{todos.length ? (
				todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
			) : (
				<p>Aucune todo à afficher</p>
			)}
		</div>
	);
};

export default TodoList;
