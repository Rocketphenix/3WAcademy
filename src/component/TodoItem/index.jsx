/* eslint-disable react/prop-types */
// path: redux-exemple/src/component/TodoItem/index.jsx
import "./style.scss";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../store/slice/todoSlice.jsx";
import { NavLink } from "react-router-dom";

const TodoItem = ({ todo }) => {
	const checkIsActive = ({ isActive }) => (isActive ? { color: "orange" } : {});
	const dispatch = useDispatch();

	const handleCompleted = () => {
		dispatch(
			updateTodo({
				...todo,
				completed: !todo.completed,
			})
		);
	};

	return (
		<div className="TodoItem">
			<NavLink to={"/TodoDetail"} style={checkIsActive} state={{ todo }}>
				<h4>{todo.title}</h4>
			</NavLink>
			<p>
				<input
					type={"checkbox"}
					onChange={handleCompleted}
					checked={todo.completed}
				/>
				<span>Complété</span>
			</p>
		</div>
	);
};

export default TodoItem;
